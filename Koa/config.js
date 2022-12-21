/* import express from 'express' */

import Koa from 'koa' 
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import {koaBody} from 'koa-body'
import connectDB from './src/conexionDB/mongoDB.js'
import * as dotenv from 'dotenv'
/* import session from 'express-session'
import passport from 'passport' */
import routerProductos from './src/routes/routerProductos.js'  


dotenv.config()

connectDB()

const app = new Koa

app.use(koaBody())
app.use(json())
app.use(bodyParser())



/* app.use(express.json())  */

/*
app.use(express.static('public'))
app.use(express.urlencoded({extended: true})) */



/* app.use(session({
    secret: 'secret',
    cookie:{
        httpOnly: true,
        maxAge: 1000 * 60 * 10,
        secure: false,
    },
    resave: false,
    rolling: true, 
    saveUninitialized: false,
})) */

/* app.use(passport.initialize())
app.use(passport.session()) */

/* app.use('/public', express.static(`./src/public`)) */

app.use(routerProductos.routes()).use(routerProductos.allowedMethods());

export default app