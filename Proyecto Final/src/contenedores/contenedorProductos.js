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

    save = async (productoNuevo) =>{
        const {title,price,thumbnail, categoria} = productoNuevo
        let producto = new Productos({
            title,
            price,
            thumbnail,
            categoria
        })
        try{
            await producto.save()
            return producto
        } catch (error) {
            logger.error(error.messege)
        }
    }

    getById = async (id) => {        
        try{
            let productoId = await Productos.findById(id)
            return productoId
        } catch (err){
            logger.error(err)
        }
    }
    getByCategoria = async (categoria) => {        
        try{
            let productoCat = await Productos.find({"categoria": `${categoria}`})
            return productoCat
        } catch (err){
            logger.error(err)
        }
    }

    upload = async (productoModificado) => {
        const {id,title,price,thumbnail,categoria} = productoModificado
        try{
            await Productos.findByIdAndUpdate(id, {title: title, price: price, thumbnail: thumbnail, categoria: categoria})
            let upProduct = await Productos.findById(id)
            return upProduct
        } catch (err){
            logger.error(err)
        }
    }

    deleteById = async (id) => {
            try{
                await Productos.findByIdAndDelete(id)
                let res = {mensaje: `Producto ${id} eliminado`}
                return res
            } catch (err) {
                logger.error(err)
            }
        }
}
export default ContenedorProductos