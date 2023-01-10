import chatModule from "../utils/chatModule.js";
import Chat from "../utils/chatModule.js"

// Funciones de mensajes

class ContenedorSocket {
    async guardarMensaje(mensajes){
        const {usuario,mensaje} = mensajes
        try {
            let chat = new Chat({
                usuario,
                mensaje,
            })
            await chat.save()
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    async getAllMensajes () {
        try{
            let chats = await Chat.find()
            return chats
            
        }
        catch (err){
            return err
        }
    }
    async getAllMensajesEmail(email) {
        try{
            let chatEmail = await Chat.find({ usuario: { $eq: `${email}` } })
            return chatEmail
        }
        catch (err){
            return err
        }
    }
}


export default ContenedorSocket 