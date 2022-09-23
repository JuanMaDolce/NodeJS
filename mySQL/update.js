const {options} = require('./mariaDB/conexion')

const knex = require('knex')(options)

knex.from('cars').where('price', 100).update({
    price: 100000
})
.then(res => console.log(res))
.catch(err => console.log(err))