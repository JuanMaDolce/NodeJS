const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const logger = require('morgan')
const MongoStore = require('connect-mongo')

const advanceOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}

const indexRouter = require('./src/routes/index')
require('dotenv').config()

const app = express()

app.set('view engine', 'ejs');
app.set('views', __dirname +'/src/views')

app.use(logger('dev'))

app.use(session({
    secret: process.env.SECRET_SESSION || '123456',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl:'mongodb+srv://jmdolce:juancete11@cluster0.ckxejzf.mongodb.net/?retryWrites=true&w=majority', mongoOptions: advanceOptions}),       
    cookie: {
        expires: 60000
    }
}))

app.use(cookieParser(process.env.COOKIE_SECRET || '123456'))

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(indexRouter)

module.exports = app;
