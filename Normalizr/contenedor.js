const fs = require('fs')
const normalizr = require('normalizr')
const {normalize,schema} = normalizr

const util = require('util')

const print = (obj) =>{
    console.log(util.inspect(obj, false, 12, true))
}


const authorSchema = new schema.Entity('author', {}, {idAttribute: "id"});
const comentSchema = new schema.Entity('text');
const postSchema =[{
    author: authorSchema,
    text: comentSchema
}]


class Contenedor {

    async guardarMensaje(post){
        let dataFile = fs.readFileSync("./DB/mensajes.txt", "utf-8")
        let dataFileParse = JSON.parse(dataFile) 
         
        if(dataFileParse.length){

             fs.writeFileSync("./DB/mensajes.txt", JSON.stringify([...dataFileParse, post], null, 2))

        } else {
            fs.writeFileSync("./DB/mensajes.txt", JSON.stringify([post], null, 2))

    }}
    async getAllMensajes () {
        let dataFile = fs.readFileSync("./DB/mensajes.txt", "utf-8")
        let dataFileParse = JSON.parse(dataFile) 

        try {
            const msje = await dataFileParse

            const normalizedMsje = normalize(msje, postSchema)

            return normalizedMsje
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}


module.exports = Contenedor