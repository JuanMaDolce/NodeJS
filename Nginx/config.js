const express = require('express')
const session = require('express-session')
const passport = require('passport')
const connectDB = require('./src/conexion/mongoDB')
const routerSesion =require('./src/routes/routerSesion')
const routerProcess =require('./src/routes/routerProcess')


require('dotenv').config()

const app = express()

connectDB()

app.set('view engine', 'ejs');
app.set('views', __dirname +'/src/views')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: 'secret',
    cookie:{
        httpOnly: true,
        maxAge: 1000 * 60 * 10,
        secure: false,
    },
    resave: false,
    rolling: true,
    saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(routerSesion)
app.use(routerProcess)

module.exports = app