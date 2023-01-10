import express from 'express'
import { apiProductos } from '../daos/index.js'

const {Router} = express

const routerProductos = Router()

// Buscadores de productos, en su totalidad, por ID y categoría

routerProductos.get('/', async (req,res) =>{
    const list = await apiProductos.getAll()
    res.json(list)
})

routerProductos.get('/:id', async (req,res) =>{
    const {id} = req.params
    res.json( await apiProductos.getById(id))
}) 

routerProductos.get('/prod/:categoria', async (req,res) =>{
    const {categoria} = req.params 
    res.json( await apiProductos.getByCategoria(categoria))
})

// Ingreso de productos, modificaciones y eliminación

routerProductos.post('/', async (req,res) =>{
    const {title,price,thumbnail, categoria} = req.body
    const productoNuevo ={
        title,
        price,
        thumbnail,
        categoria
    }
    const product = await apiProductos.save(productoNuevo)
    res.send(product)
})

routerProductos.put('/:id', async (req,res)=>{
    const {id} = req.params
    const {title,price,thumbnail,categoria} = req.body
    const productoModificado ={
        id,
        title,
        price,
        thumbnail,
        categoria
    }
    res.send( await apiProductos.upload(productoModificado))
})

routerProductos.delete('/:id', async (req,res)=>{
    const {id} = req.params
    res.send(await apiProductos.deleteById(id))
})

export default routerProductos