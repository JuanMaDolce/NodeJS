import express from 'express'
import { apiSocket } from '../daos/index.js'

// Configuración del Chat, guardado de mensajes y lectura de mensajes por todos o por mail (complementa con el index dentro del public)

const {Router} = express

export const routerChat = Router()

routerChat.get('/chat', (req,res)=>{
    res.render('chat')
})

routerChat.get('/chat/:chat', async (req,res)=>{
    const {chat} = req.params
    let chatsEmail = await apiSocket.getAllMensajesEmail(chat)
    res.render('chatEmail', {
        chatsEmail
    })
})

export const mensajes = (socket, io) =>{

    socket.on('chat-nuevo', async  mensajes =>{
        apiSocket.guardarMensaje(mensajes)
        const listaMensajes = await apiSocket.getAllMensajes()
        socket.emit('mensajes-server', listaMensajes)
    })

}
    


