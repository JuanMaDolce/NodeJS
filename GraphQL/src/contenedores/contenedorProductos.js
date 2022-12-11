import Productos from "../../src/GraphQLSrc/Modelos/ProductosModelo.js"
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

    save = async (datos) =>{
        const {title,price,thumbnail} = JSON.parse(JSON.stringify(datos.datos))

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
        
        try{
            let product = await Productos.findById(id)
            return product
        } catch (err){
            logger.error(err)
        }
    }

    upload = async (id,datos) => {
        const {title,price,thumbnail} = JSON.parse(JSON.stringify(datos.datos))
        try{
            let product = await Productos.findByIdAndUpdate(id, {title: title, price: price, thumbnail: thumbnail})
            return product
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