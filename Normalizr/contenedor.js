const fs = require('fs')
const normalizr = require('normalizr')
const {normalize,denormalize,schema} = normalizr

const util = require('util')

const print = (obj) =>{
    console.log(util.inspect(obj, false, 12, true))
}


let dataFile = fs.readFileSync("./DB/mensajes.txt", "utf-8")
let dataFileParse = JSON.parse(dataFile) 







    const authorSchema = new schema.Entity('id')
    
    const mensajesSchema = new schema.Entity('mensaje')

    const postSchema = new schema.Entity('post',{
        author: authorSchema,
        text: [mensajesSchema]
    })

    const normalizedMsje = normalize( dataFileParse, postSchema)

    console.log(print(normalizedMsje))



class Contenedor {

    async guardarMensaje(post){
        let dataFile = fs.readFileSync("./DB/mensajes.txt", "utf-8")
        let dataFileParse = JSON.parse(dataFile) 
         
        if(dataFileParse.length){

             fs.writeFileSync("./DB/mensajes.txt", JSON.stringify([...dataFileParse, post], null, 2))

        } else {
            fs.writeFileSync("./DB/mensajes.txt", JSON.stringify([post], null, 2))

    }}
/*     async getAllMensajes () {
        let dataFile = fs.readFileSync("./DB/mensajes.txt", "utf-8")
        let dataFileParse = JSON.parse(dataFile) 





        try {
            const msje = await dataFileParse

            const authorSchema = new schema.Entity('id')
            
            const postSchema = new schema.Entity('post',{
                author: [authorSchema]
            })

            const normalizedMsje = normalize(await msje, postSchema)

            console.log(print(normalizedMsje))

            return msje
        } catch (error) {
            console.log(error);
            throw error
        }
    } */
}


module.exports = Contenedor