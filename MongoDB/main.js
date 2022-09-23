const express = require('express')
/* const dotenv = require('dotenv').config() */

const { Router } = express

const Users = require('./models/usuarios.model.js')
const connectDB = require('./connection/connection')

const app = express()
const router = Router()

connectDB()

app.use(express.json())
app.use( express.urlencoded({ extended: true }) )


router.get('/', async (req, res) => {

    // crear un usuario
     let usuario = new Users({
        name: 'Juan',
        email: 'j@gmail.com',
        password: '123456'
    })
    await usuario.save()

    // actualizar un usuario
    // await Users.updateOne({name: 'Juan'}, {$set: {email: 'juan@gmail.com'}})
    // console.log('usuario actualizado')


    // eliminar un usuario
    // await Users.deleteOne({name: 'Juan'})
    // console.log('usuario eliminado')

     // create
    //  console.log('CREATE (4 usuarios)')

    //  new Users({ name: 'leandro1', email: 'lean1@gmail.com', password: '123456'}).save()
    //  new Users({ name: 'leandro2', email: 'lean2@gmail.com', password: '123456'}).save()
    //  new Users({ name: 'leandro3', email: 'lean3@gmail.com', password: '123456'}).save()
    //  new Users({ name: 'leandro4', email: 'lean4@gmail.com', password: '123456'}).save()

    // console.log('READ PROJECTION + FILTER')
    // console.log( await Users.find({name: 'leandro1'}, { name: 1, email: 1, _id: 0}) )
    // console.log( await Users.find({name: 'leandro2'}, { name: 1, email: 1, _id: 0}) )
    
    // console.log('READ PROJECTION + SORT')
    // console.log( await Users.find({}, {name: 1, _id: 0}).sort({name: 1}) )
    
    // console.log('READ PROJECTION + SORT + SKIP')
    // console.log( await Users.find({}, {name: 1, _id: 0}).sort({name: -1}).skip(1) )
  

    // traer rodos los usuarios
    const usuarios = await Users.find()
    console.log(usuarios)


    res.send('Hello World')
})

// router.post('/', async (req, res) => {
//     const { name, email, password } = req.body
//     const usuario = new Users({ name, email, password })
//     await usuario.save()
//     res.send('usuario creado')
// })

// const validate=(req, res, next)=>{
//     console.log('validate')
//     return next()
// }

// router.put('/', validate ,async (req, res) => {
//     const { name, email, password } = req.body
//     await Users.updateOne({name}, {$set: {email, password}})
//     res.send('usuario actualizado')  
// })

app.use('/api/usuarios', router)

app.listen(4000, () => {
    console.log('Server started on port 4000')
})

