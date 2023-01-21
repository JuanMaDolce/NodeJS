import Productos from "../utils/productosModule.js"
import Carrito from "../utils/carritoModule.js"
import Orden from "../utils/OrdenModule.js"
import logger from "../logs/logs.js"
import {mailCompra} from '../utils/mail.js'
import {enviarSMS, enviarWhatsapp} from '../utils/mensajes.js'

const arrayProductos = []

class ContenedorCarrito{

    
    saveCart = async (email,direccion) => {
        let carrito = new Carrito({
            email,
            direccion
        })
        try{
            await carrito.save()
            return carrito
        } catch (error) {
            logger.error(error.messege)
        } 
    }

    getCart = async () => {
        try{
            let buscarCarrito = await Carrito.find()
            if (buscarCarrito){
                return buscarCarrito
            } else {
                const error = error 
                return error
            }
        } catch (err){
            logger.error(err)
        }
    }

    getCartById = async (id) => {
        try{
            let carritoID = await Carrito.findById(id)
            let productos = JSON.stringify(Object.values(carritoID.productos)) 
            if (carritoID){

                return productos
            } else {
                const error = {error: 'ID de carrito inexistente' }
                return error
            }
        } catch (err){
            logger.error(err)
        }
    }

    deleteCartByID = async (id) => {
        try{
            await Carrito.findByIdAndDelete(id)
            let res = {mensaje: `Carrito ${id} eliminado`}
            return res
        } catch (err) {
            logger.error(err)
        }
    }

    addProductToCart = async (id) => {
        try{
            const cartFind = await Carrito.find()

            const productoId = await Productos.findById(id)

            arrayProductos.push(productoId)

            if(cartFind.length && productoId){

                cartFind[0].productos = arrayProductos

                await cartFind[0].save()
                
                return cartFind[0]

            } else if (productoId){
                let carrito = new Carrito({
                    productos: arrayProductos
                })
                await carrito.save()
                return carrito
            }  else {
                const error = 'ID producto inexistente'
                return error
            }
        } catch (err){
            logger.error(err)
        }
    }

    deleteProductByID = async (id,id_prod) => {
        
        const cartFind = await Carrito.findById(id)

        if(cartFind){

            const products = await cartFind.productos

            await Carrito.findByIdAndUpdate(id, {productos: products.filter(p => p._id != id_prod)})

            const newCart = await Carrito.findById(id)

            return newCart

        } else{
            const error = {error: 'ID de producto inexistente' }
            return error 
        } 
    } 
    
    enviarPedido = async (user) => {
        const carrito = await Carrito.findOne()
        mailCompra(user,carrito)
        enviarSMS(user)
        enviarWhatsapp(user,carrito)
        const orden = new Orden({
            pedido: carrito.id,
            items: JSON.stringify(carrito.productos),
            horario: Date.now(),
            estado: 'Generado',
            usuario: user.username
        })
        await orden.save()
    } 
}
export default ContenedorCarrito
