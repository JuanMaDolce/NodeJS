import { apiCarrito } from "../daos/index.js"

export const getCarritos = async (req,res) =>{
    let carrito = await apiCarrito.getCart()
    res.status(200).render('carrito',{
        carrito
    })
}

export const getCarritoById = async (req,res) =>{
    const {id} = req.params
    let carrito = await apiCarrito.getCartById(id)
    res.status(200).render('carrito',{
        carrito
    })
}

// Creación del carrito, pedido o ingreso de productos al carrito por ID

export const carritoNuevo = async (req,res) =>{
     const {email,direccion} = req.body 
    const newCartAdd = await apiCarrito.saveCart(email,direccion)
    res.send(newCartAdd)
}

export const pedidoNuevo = async (req,res) =>{
    await apiCarrito.enviarPedido(req.user)
    res.redirect("/api/pedidos")
}

export const productoAlCarrito = async (req,res) =>{
    const {id} = req.params
    const productoCarrito = await apiCarrito.addProductToCart((id))
    res.json(productoCarrito)
}

//  Elimina el carrito o un producto dentro del carrito por ID

export const deleteCarrito = async (req,res)=>{
    const {id} = req.params
    res.send(await apiCarrito.deleteCartByID(id))
}

export const deleteProdCarrito = async (req,res)=>{
    const {id,id_prod} = req.params
    res.send(await apiCarrito.deleteProductByID(id,id_prod))
}