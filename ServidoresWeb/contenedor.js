const fs = require('fs')
const emptyArray = [] 
let dataFile = fs.readFileSync('./productos.txt', 'utf8')
let dataFileParse = JSON.parse(dataFile)


class Contenedor {
    constructor(title, price, thumbnail){
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
    async save(object){
        try{
            if (dataFileParse.length){
                let id = dataFileParse[dataFileParse.length - 1].id + 1
                await fs.promises.writeFile('./productos.txt', JSON.stringify([...dataFileParse, {...object, id: id}], null, 2))
                console.log(`Producto agregado ${this.title} ID ${id}`)
            } else {
                await fs.promises.writeFile('./productos.txt', JSON.stringify([{...object, id: 1}], null, 2))
                console.log(`Producto agregado ${this.title} ID 1`)
            }
                
        } catch (err) {
            console.log(err)
        }
    }
}
module.exports = Contenedor