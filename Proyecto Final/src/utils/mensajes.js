import twilio from 'twilio'
import logger from '../logs/logs.js'

const accountSid = 'ACeddc10f47ba678b8ebd5bf24385ccf00'
const authToken = 'ca1b845100eba4716bb3716903172f9a' 

const cliente = twilio(accountSid, authToken)

export const enviarSMS = async (user) =>{
    try {
        const mensaje = await cliente.messages.create({
            body: 'Tu pedido ha sido recibido, y se encuentra en proceso',
            from: '+18437382337',
            to: `+54${user.phone}`
        })
    } catch (error) {
        logger.error(error)
    }
}

export const enviarWhatsapp = async (user, carrito) =>{
    try {
        const mensaje = await cliente.messages.create({
            body: `Nuevo pedido de ${user.name} - ${user.username}
            Tu pedido ${carrito.id}`,
            from: '+18437382337',
            to: `+54${user.phone}`
        })
    } catch (error) {
        logger.error(error)
    }
}
