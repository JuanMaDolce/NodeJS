import Pedidos from "../contenedores/contenedorPedidos.js"

export const verPedidos = async (req,res) =>{
    let pedido = await Pedidos.getPedidos()
    let pedidos = pedido[0]
    res.render('pedido',{
        pedidos
    })
}

export const verPedidosId = async (req,res) =>{
    const {id} = req.params
    let pedidoId = await Pedidos.getByIdPedidos(id)
    let pedidos = pedidoId[0]
    res.render('pedido',{
        pedidos
    }) 
}