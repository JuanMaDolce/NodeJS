const express = require('express')
const Contenedor = require('../contenedor/contenedor')
const {fork} = require('child_process')

const routerProcess = express.Router()


routerProcess.get('/info', (req, res)=>{
    res.status(500).json(Contenedor.process())
})

routerProcess.get('/api/randoms', (req, res)=>{
    const cant = req.query.cant
     const forked = fork('src/child/child.js')
     if(!isNaN(cant) == true ){
        forked.on('message', msg =>{
            if(msg == 'listo'){
                forked.send(cant)
            } else {
                res.status(200).json(msg)
            }
        })
    } else {
        forked.on('message', msg =>{
            if(msg == 'listo'){
                forked.send('hola')
            } else {
                res.status(200).json(msg)
            }
        })
    }
})

module.exports = routerProcess