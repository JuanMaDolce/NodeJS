const express = require('express')
const { Server: ServerHttp } = require('http')
const { Server: ServerIo } = require('socket.io')
const Contenedor = require('./contenedor')
const productosFaker = require('./faker')

const app = express()
const serverHttp = new ServerHttp(app)
const io = new ServerIo(serverHttp)
const contenedor = new Contenedor

app.use(express.static('public'))
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', './views')


app.get('/', (req,res) =>{
    res.render('main')
})

app.get('/api/productos-test', async  (req,res) =>{
    res.render('productos')
})

io.on('connection', socket => {
        console.log('User connected') 
         
        socket.on('chat-nuevo', post =>{
            contenedor.guardarMensaje(post)
            const listaMensajes = contenedor.getAllMensajes()
            listaMensajes.then(val => io.sockets.emit('mensajes-server', val))
        })
        
        socket.on('producto-nuevo', producto =>{
            let data = producto
            productosFaker.then(val => io.sockets.emit('productos-server', val))
        })  
    
    })

serverHttp.listen(3000, () =>{
    console.log('server running on port 3000')
})