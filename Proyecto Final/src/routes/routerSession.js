import express from 'express'
import passport from 'passport'
import { Strategy } from 'passport-local'
import Users from "../utils/sessionModule.js"
import upload from '../utils/multer.js'
import ContenedorSession from '../contenedores/contenedorSession.js'

const LocalStrategy = Strategy

const {Router} = express

const routerSession = Router()


// Configuración Passport, Autentificaciones y rutas de regitro, ingreso y home

passport.use('ingreso', new LocalStrategy(
    async (username, password, done) =>{

        let usuario = await Users.findOne({"username": username})

        if(!usuario){
            return done(null, false, {message: `Usuario ${username} no encontrado`})
        }
        if(!ContenedorSession.validarPassword(usuario, password)){
            return done(null, false, {message: 'Password incorrecto'})
        }
        return done(null, usuario)

    }
))

passport.use('registro', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done)=>{
    const {filename} = req.file
    const {name, address, age, phone} = req.body
    let usuario = await Users.findOne({ "username": username})
    if(usuario){
        return done (null, false, {message: `El usuario ${username} ya existe`})
    }
    const passCrypted =  ContenedorSession.createHash(password)

    let usuarioData = {
        username, 
        passCrypted,
        name,
        address,
        age,
        phone,
        filename
    }

    return done(null, ContenedorSession.guardarUsuario(usuarioData))
}))

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
passport.deserializeUser((user, done) => {
    done(null, user);
  });

routerSession.get('/registro', (req, res)=>{
    res.status(200).render('main')
})


routerSession.post('/registro', upload.single('avatar'),passport.authenticate('registro',{
    successRedirect: 'ingreso',
    failureRedirect: 'registro'
}))

routerSession.get('/ingreso', (req, res)=>{
    res.status(200).render('login')
})

routerSession.post('/ingreso', passport.authenticate('ingreso',{
    successRedirect: 'home',
    failureRedirect: 'ingreso'
}))

routerSession.get('/home', ContenedorSession.checkAuth , (req,res)=>{
    try{
        res.status(200).render('home',{
            name: req.user.username,
            avatar: req.user.avatar
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

routerSession.get('/logout', (req,res,next)=>{
    req.logout((err)=>{
        if (err) {
            return next(err)
        }
        res.redirect('ingreso')
    })
})

export default routerSession