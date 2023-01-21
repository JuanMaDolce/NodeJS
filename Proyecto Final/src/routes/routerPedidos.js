import express from 'express'
import { verPedidos,verPedidosId } from '../controllers/pedidosController.js' 
import ContenedorSession from '../contenedores/contenedorSession.js'


const {Router} = express

const routerPedidos = Router()


routerPedidos.get('/', ContenedorSession.checkAuth, verPedidos)

routerPedidos.get('/:id', verPedidosId)


export default routerPedidos