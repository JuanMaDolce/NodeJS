const express = require('express')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('../modelos/esquemas')

const Contenedor = require('../contenedor/contenedor')

const routerSesion = express.Router()


passport.use('ingreso',  new LocalStrategy(
    async (username, password, done)=>{
        
        let usuario = await Users.findOne({ "username": username})

        if(!usuario){
            return done(null, false, {message: `Usuario ${username} no encontrado`})
        }
        if(!Contenedor.validarPassword(usuario, password)){
            return done(null, false, {message: 'Password incorrecto'})
        } 
        return done(null, usuario)
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

routerSesion.get('/registro', (req, res)=>{
    res.status(200).render('main')
})


routerSesion.post('/registro', passport.authenticate('registro',{
    successRedirect: 'ingreso',
    failureRedirect: 'registro'
}))

routerSesion.get('/ingreso', (req, res)=>{
    res.status(200).render('login')
})

routerSesion.post('/ingreso', passport.authenticate('ingreso',{
    successRedirect: 'home',
    failureRedirect: 'ingreso'
}))

routerSesion.get('/home', Contenedor.checkAuth , (req,res)=>{
    try{
        res.status(200).render('home',{
            name: req.user.username
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

routerSesion.get('/logout', (req,res,next)=>{
    req.logout((err)=>{
        if (err) {
            return next(err)
        }
        res.redirect('ingreso')
    })
})


module.exports = routerSesion