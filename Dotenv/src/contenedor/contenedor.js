const bcrypt = require('bcrypt')
const Users = require('../modelos/esquemas')
const {fork} = require('child_process')


class Contenedor {
    static guardarUsuario = async (username, password) =>{
        try{
            let usuario = new Users({
                username,
                password
            })
            await usuario.save()
            return usuario
        } catch (err){
            console.log(err.message)
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

    static createHash = (password) =>{
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
    }
    
    static checkAuth = (req, res, next) =>{
        if(req.isAuthenticated()) {
            next()
        } else {
            res.redirect('ingreso')
        }
    }

    static process = () =>{
        const memoria = process.memoryUsage.rss()
        const sistmaOperativo = process.platform
        const version = process.version
        const processId =  process.pid
        const directorio = process.cwd()
        const argumentos = process.argv.slice(2)
        const path = process.mainModule.paths

        const datos ={
            memoria,
            sistmaOperativo,
            version,
            processId,
            directorio,
            argumentos,
            path
        }
        return datos
    }
    
    static random = (cant) =>{
        const forked = fork('src/child/child.js')
        if(!isNaN(cant) == true ){
            forked.on('message', msg =>{
                if(msg == 'listo'){
                    forked.send(cant)
                } else {
                    console.log(msg)
                    return msg
                }
            })
        } else {
            forked.on('message', msg =>{
                if(msg == 'listo'){
                    forked.send('hola')
                } else {
                    console.log(msg)
                    return msg
                }
            })
        }
    }
}

module.exports = Contenedor