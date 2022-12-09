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
    _id: ID,
    title: String,
    price: Int,
    thumbnail: String
  }
  type Query {
    getProducto(id: ID): Producto,
    getProductos(campo: String, valor: String): [Producto],
  }
  type Mutation {
    crearProducto(datos: ProductoInput ): Producto,
    updateProducto(id: ID, datos: ProductoInput): Producto,
    deleteProducto(id: ID): Producto
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
