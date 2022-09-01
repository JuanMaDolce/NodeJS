const {optionsSqlite3} = require('./sqlite3/conexionDB')
const {optionsMariaDB} = require('./mariaDB/conexion')

const knexSqlite = require('knex')(optionsSqlite3)
const knexMariaDB = require('knex')(optionsMariaDB)

class Contenedor {
    title
    price
    thumbnail
    
    constructor(title, price, thumbnail) {
        this.title = title,
        this.price = price,
        this.thumbnail = thumbnail
    }
    async crearTablaProductos (nombreTabla) {
        try {
            await knexMariaDB.schema.createTable(nombreTabla, table =>{
                table.string('nombre'),
                table.integer('precio'),
                table.string('url')
            })
            console.log(`Tabla Creada ${nombreTabla}` )
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    async crearTablaMensajes (nombreTabla) {
        try {
            await knexSqlite.schema.createTable(nombreTabla, table =>{
                table.string('usuario'),
                table.integer('mensaje'),
                table.string('horario')
            })
            console.log(`Tabla Creada ${nombreTabla}` )
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    async guardarProducto(producto){
        try {
            await knexMariaDB('Productos').insert(producto)
            .then(res=> console.log(res))
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    async getAllProductos () {
        try {
            const productos = await knexMariaDB.from('Productos').select('*')
            console.log(productos)
            return productos
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    async guardarMensaje(mensaje){
        try {
            await knexSqlite('Mensajes').insert(mensaje)
            .then(res=> console.log(res))
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    async getAllMensajes () {
        try {
            const mensajes = await knexSqlite.from('Mensajes').select('*')
            console.log(mensajes)
            return mensajes
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    async save(title,price,thumbnail){
        let newProduct = {
            title,
            price,
            thumbnail,
        }    
        try {
            await knexSqlite('productos').insert(newProduct)
            .then(res=> console.log(res))
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    async getById(id) {
        let productos = await knexSqlite.from('productos').select('*')
        try{
            if(productos.find(p=>p.id === id)){
                await knexSqlite.from('productos').select('*').where('id', '=', id)
                .then(res => console.log(res))
            } else {
                console.log('Producto con ID inexistente')
            }
        } catch (err){
            console.log(err)
        }
    }
    async upload(id,title,price,thumbnail){
        let productos = await knexSqlite.from('productos').select('*')
        try{
            if (productos.find( p => p.id === id)){
                await knexSqlite.from('productos').where('id', '=', id).update({
                    title,
                    price,
                    thumbnail
                })
                console.log(await knexSqlite.from('productos').select('*'))
            } else {
                console.log('ID de producto inexistente' )
            } 
        } catch (err){
            console.log(err)
        }
    } 
    async deleteById(id){
        let productos = await knexSqlite.from('productos').select('*')
        try{
            if(productos.find(p=>p.id === id)){
                await knexSqlite.from('productos').where('id', '=', id).del()
                console.log(await knexSqlite.from('productos').select('*'))
            } else {
                console.log('Producto con ID inexistente')
            }
        } catch (err){
            console.log(err)
        }
    }
}
module.exports = Contenedor