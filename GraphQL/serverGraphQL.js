import express from 'express'
import GraphQLController from './src/GraphQLSrc/Controladores/ControladorGraphQL.js'
import connectDB from './src/conexionDB/mongoDB.js'

connectDB()

const appGraphQL = express()

const gqlConfig = new GraphQLController

appGraphQL.use(express.static('public'))

appGraphQL.use('/gql', gqlConfig)

const PORT2 = 8000

appGraphQL.listen(PORT2, err => {
    if (err) {
        console.log(err)
    }
    console.log(`El servidor corriendo en el puerto ${PORT2}`)
})