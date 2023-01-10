import Orden from "../utils/OrdenModule.js"

class Pedidos {

    static getPedidos = async () => {
        const pedidos = await Orden.find()
        return pedidos
    }

    static getByIdPedidos = async (id) =>{
        const pedidoId = await Orden.find({orden: {eq:`${id}`}})
        return pedidoId
    }
}

export default Pedidos