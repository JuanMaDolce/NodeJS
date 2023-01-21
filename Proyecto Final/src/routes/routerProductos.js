import express from 'express'
import { getProductos, getByID, getByCategoria, postProducto, modProducto, borrarProducto} from '../controllers/productController.js'

const {Router} = express

const routerProductos = Router()

// Buscadores de productos, en su totalidad, por ID y categoría

routerProductos.get('/', getProductos)

routerProductos.get('/:id', getByID) 

routerProductos.get('/prod/:categoria', getByCategoria)

// Ingreso de productos, modificaciones y eliminación

routerProductos.post('/', postProducto)

routerProductos.put('/:id', modProducto)

routerProductos.delete('/:id', borrarProducto)

export default routerProductos