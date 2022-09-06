const express = require('express')
const { Server: ServerHttp } = require('http')
const { Server: ServerIo } = require('socket.io')
const Contenedor = require('./contenedor')

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

/* contenedor.crearTablaMensajes('Mensajes') */
/* contenedor.crearTablaProductos('Productos') */ 

io.on('connection', socket => {
        console.log('User connected') 
    
        socket.on('chat-nuevo', mensajes =>{
            contenedor.guardarMensaje(mensajes)
            const listaMensajes = contenedor.getAllMensajes()
            listaMensajes.then(val => io.sockets.emit('mensajes-server', val))
        })
        
        socket.on('producto-nuevo', producto =>{
            contenedor.guardarProducto(producto)
            const listaProductos = contenedor.getAllProductos()
            listaProductos.then(val => io.sockets.emit('productos-server', val))
        })
    
    })





serverHttp.listen(3000, () =>{
    console.log('server running on port 3000')
    
})