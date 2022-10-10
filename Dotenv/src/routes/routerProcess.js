const express = require('express')
const Contenedor = require('../contenedor/contenedor')

const routerProcess = express.Router()


routerProcess.get('/info', (req, res)=>{
    res.status(500).json(Contenedor.process())
})

routerProcess.get('/api/randoms', async (req, res)=>{
    const cant = req.query.cant
    res.status(500).send( Contenedor.random(Number(cant)))
})

module.exports = routerProcess