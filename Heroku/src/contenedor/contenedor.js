const bcrypt = require('bcrypt')
const Users = require('../modelos/esquemas')


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
    
}

module.exports = Contenedor