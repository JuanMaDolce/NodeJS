import { apiProductos } from "../daos/index.js"



export const getProductos = async (req,res) =>{
    const list = await apiProductos.getAll()
    res.json(list)
}

export const getByID = async (req,res) =>{
    const {id} = req.params
    res.json( await apiProductos.getById(id))
}

export const getByCategoria = async (req,res) =>{
    const {categoria} = req.params 
    res.json( await apiProductos.getByCategoria(categoria))
}

export const postProducto = async (req,res) =>{
    const {title,price,thumbnail, categoria} = req.body
    const productoNuevo ={
        title,
        price,
        thumbnail,
        categoria
    }
    const product = await apiProductos.save(productoNuevo)
    res.send(product)
}

export const modProducto = async (req,res)=>{
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
}

export const borrarProducto = async (req,res)=>{
    const {id} = req.params
    res.send(await apiProductos.deleteById(id))
}