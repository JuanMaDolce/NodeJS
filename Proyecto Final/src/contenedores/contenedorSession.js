import bcrypt from 'bcrypt'
import Users from "../utils/sessionModule.js"
import {mailRegistro} from '../utils/mail.js'
import logger from '../logs/logs.js'


class ContenedorSession {
    static guardarUsuario = async (usuarioData) =>{
        const {username, passCrypted, name, address, age, phone, filename} = usuarioData
        try{
            let usuario = new Users({
                username,
                password: passCrypted,
                name,
                address,
                age,
                phone,
                avatar: `http://localhost:8080/public/${filename}`
            })

            await usuario.save()
            await mailRegistro(usuario)
            return usuario
        } catch (err){
            logger.error(err.message)
        }
    }
    static loginUsuario = async (username, password) =>{
        const usuario = await Users.findOne({ $and: [ { "username": username}, { "password": password} ]})
        if(usuario){
            return usuario
        } else {
            return 'Usuario no encontrado'
        }
    }

    static validarPassword =  (usuario, password) =>{
        return bcrypt.compareSync(password, usuario.password)
    } 

    // Encriptar password

    static createHash = (password) =>{
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
    }

    // Validación de usuarios para el ingreso y el armado del pedido en el carrito

    static checkAuth = (req, res, next) =>{
        if(req.isAuthenticated()) {
            next()
        } else {
            res.redirect(`http://localhost:${process.env.PORT}/ingreso`)
        }
    }
    static checkAuthCart = (req, res, next) =>{
        if(req) {
            next()
        } else {
            res.redirect('pedido')
        }
    }
    
}

export default ContenedorSession