import Productos from "../utils/productosModule.js"
import logger from "../logs/logs.js"

class ContenedorProductos{

    getAll = async () => {
        try{
            let productos = Productos.find()
            return productos
        }
        catch (err){
            return err
        }
    }

    save = async (nuevoProducto) =>{
        const {title,price,thumbnail} = nuevoProducto
        let product = new Productos({
            title,
            price,
            thumbnail
        })
        try{
            await product.save()
            return product
        } catch (error) {
            logger.error(error.messege)
        }
    }

    getById = async (id) => {   
        let product = await Productos.findById(id)
        try{
            if(product){
                return product
            } else {
                return 'Producto no encontrado'
            }
        } catch (err){
            logger.error(err)
        }
    }

    upload = async (id,producto) => {
        const {title,price,thumbnail} = producto
        try{
            let productoMod = await Productos.findByIdAndUpdate(id, {title: title, price: price, thumbnail: thumbnail})
            return productoMod
        } catch (err){
            logger.error(err)
        }
    }

    deleteById = async (id) => {
        let product = await Productos.findById(id)
            try{
                if(product){
                    let res = {mensaje: `Producto ${id} eliminado`}
                    return res
                } else {
                    return 'Producto no encontrado'
                }
            } catch (err) {
                logger.error(err)
            }
        }
}
export default ContenedorProductos