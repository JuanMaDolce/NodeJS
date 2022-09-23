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
    async crearTabla (nombreTabla) {
        try {
            await knexSqlite.schema.createTable(nombreTabla, table =>{
                table.increments('id'),
                table.string('title'),
                table.integer('price'),
                table.string('thumbnail')
            })
            console.log(`Tabla Creada ${nombreTabla}` )
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    async getAll () {
        try {
            await knexSqlite.from('productos').select('*')
            .then(res => console.log(res))
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