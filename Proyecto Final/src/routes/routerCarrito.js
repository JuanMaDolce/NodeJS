import express from 'express'
import ContenedorSession from "../contenedores/contenedorSession.js"
import {getCarritos, getCarritoById, carritoNuevo, pedidoNuevo, productoAlCarrito, deleteCarrito, deleteProdCarrito} from "../controllers/carritoController.js"

const {Router} = express

const routerCarrito = Router()

// Visualización del carrito por pedido o los productos dentro del carrito

routerCarrito.get('/', ContenedorSession.checkAuth, getCarritos)

routerCarrito.get('/:id/productos', ContenedorSession.checkAuth, getCarritoById)

// Creación del carrito, pedido o ingreso de productos al carrito por ID

routerCarrito.post('/', carritoNuevo)

routerCarrito.post('/pedido', ContenedorSession.checkAuthCart, pedidoNuevo)

routerCarrito.post('/:id/productos', productoAlCarrito) 

//  Elimina el carrito o un producto dentro del carrito por ID

routerCarrito.delete('/:id', deleteCarrito)

routerCarrito.delete('/:id/productos/:id_prod',deleteProdCarrito) 


export default routerCarrito