import express from 'express'
import { apiSocket } from '../daos/index.js'
import { chatUsuario } from '../controllers/chatController.js'
import ContenedorSession from '../contenedores/contenedorSession.js'

// Configuración del Chat, guardado de mensajes y lectura de mensajes por todos o por mail (complementa con el index dentro del public)

const {Router} = express

export const routerChat = Router()

routerChat.get('/chat', ContenedorSession.checkAuth, (req,res)=>{
    res.render('chat')
})


routerChat.get('/chat/:chat', ContenedorSession.checkAuth, chatUsuario)

export const mensajes = (socket, io) =>{

    socket.on('chat-nuevo', async  mensajes =>{
        apiSocket.guardarMensaje(mensajes)
        const listaMensajes = await apiSocket.getAllMensajes()
        socket.emit('mensajes-server', listaMensajes)
    })

}
    


