const {options} = require('./sqlite3/conexionDB')

const knex = require('knex')(options)

knex.from('cars').select('*') /* .where('price', '>', '100').orderBy('id', 'desc') */
.then(res => console.log(res))
.catch(err => console.log(err))