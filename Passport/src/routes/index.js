const express = require('express')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('../modelos/esquemas')

const Contenedor = require('../contenedor/contenedor')

const router = express.Router()


passport.use('ingreso',  new LocalStrategy(
    async (username, password, done)=>{
        
        let usuario = await Users.findOne({ "username": username})

        if(!usuario){
            return done(null, false, {message: `Usuario ${username} no encontrado`})
        }
        if(!Contenedor.validarPassword(usuario, password)){
            return done(null, false, {message: 'Password incorrecto'})
        } 
        done(null, usuario)
    }
))

passport.use('registro', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done)=>{
    let usuario = await Users.findOne({ "username": username})
    if(usuario){
        return done(null, false, {message: `El usuario ${username} ya existe`})
    }
    const passCrypted = Contenedor.createHash(password)
    return done (null, Contenedor.guardarUsuario(username, passCrypted))
}))


passport.serializeUser((user, done) => {
    done(null, user);
  });
  
passport.deserializeUser((user, done) => {
    done(null, user);
  });

router.get('/registro', (req, res)=>{
    res.status(200).render('main')
})


router.post('/registro', passport.authenticate('registro',{
    successRedirect: 'ingreso',
    failureRedirect: 'registro'
}))

router.get('/ingreso', (req, res)=>{
    res.status(200).render('login')
})

router.post('/ingreso', passport.authenticate('ingreso',{
    successRedirect: 'home',
    failureRedirect: 'ingreso'
}))

router.get('/home', Contenedor.checkAuth , (req,res)=>{
    try{
        res.status(200).render('home')
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

router.get('/logout', (req,res,next)=>{
    req.logout((err)=>{
        if (err) {
            return next(err)
        }
        res.redirect('ingreso')
    })
})

module.exports = router