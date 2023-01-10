import { apiCarrito } from '../daos/index.js'
import express from 'express'
import ContenedorSession from "../contenedores/contenedorSession.js"

const {Router} = express

const routerCarrito = Router()

// Visualización del carrito por pedido o los productos dentro del carrito

routerCarrito.get('/', async (req,res) =>{
    let carrito = await apiCarrito.getCart()
    res.status(200).render('carrito',{
        carrito
    })
})

routerCarrito.get('/:id/productos', async (req,res) =>{
    const {id} = req.params
    let carrito = await apiCarrito.getCartById(id)
    res.status(200).render('carrito',{
        carrito
    })
})

// Creación del carrito, pedido o ingreso de productos al carrito por ID

routerCarrito.post('/', async (req,res) =>{
     const {email,direccion} = req.body 
    const newCartAdd = await apiCarrito.saveCart(email,direccion)
    res.send(newCartAdd)
})

routerCarrito.post('/pedido', ContenedorSession.checkAuthCart, async (req,res) =>{
    await apiCarrito.enviarPedido(req.user)
    res.redirect("/api/pedidos")
})

routerCarrito.post('/:id/productos', async (req,res) =>{
    const {id} = req.params
    const productoCarrito = await apiCarrito.addProductToCart((id))
    res.json(productoCarrito)
}) 

//  Elimina el carrito o un producto dentro del carrito por ID

routerCarrito.delete('/:id', async (req,res)=>{
    const {id} = req.params
    res.send(await apiCarrito.deleteCartByID(id))
})

routerCarrito.delete('/:id/productos/:id_prod', async (req,res)=>{
    const {id,id_prod} = req.params
    res.send(await apiCarrito.deleteProductByID(id,id_prod))
}) 


export default routerCarrito