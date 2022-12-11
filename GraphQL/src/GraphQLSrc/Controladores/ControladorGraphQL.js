import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql'
import ContenedorProductos from '../../contenedores/contenedorProductos.js'


class Producto {
    constructor(title,price, thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}


 const schema = buildSchema(`
  input ProductoInput {
    title: String,
    price: Int,
    thumbnail: String
  }
  type Producto {
    _id: String,
    title: String,
    price: Int,
    thumbnail: String
  }
  type Query {
    getProducto(_id: String, valor: String): Producto,
    getProductos(campo: String, valor: String): [Producto],
  }
  type Mutation {
    crearProducto(datos: ProductoInput ): Producto,
    updateProducto(_id: String, valor: String, datos: ProductoInput): Producto,
    deleteProducto(_id: String, valor: String): Producto
  }
`) 

class GraphQLController{
    constructor(){
        this.api = new ContenedorProductos
        this.config = {
          schema,
          rootValue: {
            getProducto: this.api.getById,
            getProductos: this.api.getAll,
            crearProducto: this.api.save,
            updateProducto: this.api.upload,
            deleteProducto: this.api.deleteById
          },
          graphiql: true
        }
        return graphqlHTTP(this.config)
    }

    
}

/*  mutation {
        crearProducto(datos: {
            title: "Hola",
            price: 200,
            thumbnail: "Hola"
     }) 
} */


export default GraphQLController 
