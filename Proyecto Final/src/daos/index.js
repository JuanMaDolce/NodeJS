import CarritoDaoMongoDB from "./carrito/CarritoDaoMongoDB.js";
import ProductosDaoMongoDB from "./productos/ProductosDaoMongoDB.js";
import SocketDaoMongoDB from "./socxket/SocketDaoMongoDB.js";


export const apiProductos = new ProductosDaoMongoDB
export const apiCarrito = new CarritoDaoMongoDB
export const apiSocket = new SocketDaoMongoDB


