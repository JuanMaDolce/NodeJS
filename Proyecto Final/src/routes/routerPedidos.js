import express from 'express'
import Pedidos from '../contenedores/contenedorPedidos.js'


const {Router} = express

const routerPedidos = Router()


routerPedidos.get('/', async (req,res) =>{
    let pedido = await Pedidos.getPedidos()
    let pedidos = pedido[0]
    res.render('pedido',{
        pedidos
    })
})

routerPedidos.get('/:id', async (req,res) =>{
    const {id} = req.params
    let pedidoId = await Pedidos.getByIdPedidos(id)
    let pedidos = pedidoId[0]
    res.render('pedido',{
        pedidos
    }) 
})


export default routerPedidos