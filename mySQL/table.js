const {options} = require('./sqlite3/conexionDB')

const knex = require('knex')(options)


const crearTabla = async (nombreTabla) => {
    try {
        await knex.schema.createTable(nombreTabla, table =>{
            table.increments('id'),
            table.string('name'),
            table.integer('price')
        })
        console.log('Tabla Creada')
    } catch (error) {
        console.log(error);
        throw error
    }
}
crearTabla('cars')



