import { apiSocket } from "../daos/index.js"

export const chatUsuario = async (req,res)=>{
    const {chat} = req.params
    let chatsEmail = await apiSocket.getAllMensajesEmail(chat)
    res.render('chatEmail', {
        chatsEmail
    })
}