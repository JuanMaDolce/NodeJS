const {options} = require('./mariaDB/conexion')

const knex = require('knex')(options)

knex.from('cars').where('price', '>', 100).del()
.then(()=> console.log('Tabla borrada'))
.catch(err => console.log(err))
.finally(()=> knex.destroy())