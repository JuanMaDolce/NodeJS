const fs = require('fs')

class Contenedor {
    constructor(title, price, thumbnail){
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
    async save(title,price,thumbnail){
        let dataFile = fs.readFileSync('./productos.txt', 'utf8')
        let dataFileParse = JSON.parse(dataFile) 
        try{
            if (dataFileParse.length){
                let id = dataFileParse[dataFileParse.length - 1].id + 1
                let object = {title,price,thumbnail}
                await fs.promises.writeFile('./productos.txt', JSON.stringify([...dataFileParse, {...object, id: id}], null, 2))
                const productAdded = `Producto agregado ${title} ID ${id}`
                return productAdded
            } else {
                await fs.promises.writeFile('./productos.txt', JSON.stringify([{...object, id: 1}], null, 2))
                console.log(`Producto agregado ${title} ID 1`)
                const newProductAdded = `Producto agregado ${title} ID 1`
                return newProductAdded
            }
                
        } catch (err) {
            console.log(err)
        }
    }
    async upload(id,title,price,thumbnail){
        let dataFile = fs.readFileSync('./productos.txt', 'utf8')
        let dataFileParse = JSON.parse(dataFile)
        try{
            if (dataFileParse.find( p => p.id === id)){
                const newProduct = {
                    title,
                    price,
                    thumbnail,
                    id
                }
                const newArray = dataFileParse.filter(p => p.id !== id, )
                newArray.unshift(newProduct)
                await fs.promises.writeFile('productos.txt', JSON.stringify(newArray, null, 2))
                const productUploades = {
                    message: 'Producto modificado',
                    newProduct
                }
                return productUploades
            } else{
                const error = {error: 'ID de producto inexistente' }
                return error
            } 
            
                
        } catch (err) {
            console.log(err)
        }
    }
    async getAll(){
        let dataFile = fs.readFileSync('./productos.txt', 'utf8')
        let dataFileParse = JSON.parse(dataFile)
        try{
            return dataFileParse
        }
        catch (err){
            return err
        }
    }

    async getById (id) {
        let dataFile = fs.readFileSync('./productos.txt', 'utf8')
        let dataFileParse = JSON.parse(dataFile)
        try{
            if (dataFileParse.find( p => p.id === id)){
                const product = dataFileParse.find( p => p.id === id);
                return product
            } else {
                const error = {error: 'ID de producto inexistente' }
                return error
            }
        } catch (err){
            console.log(err)
        }
    } 
    async deleteById(id){
        let dataFile = fs.readFileSync('./productos.txt', 'utf8')
        let dataFileParse = JSON.parse(dataFile)
        try{
            if ((dataFileParse.find(p => p.id === id))){
                const newArray = dataFileParse.filter(p => p.id !== id)
                await fs.promises.writeFile('productos.txt', JSON.stringify(newArray, null, 2))
                const supr = `Producto ID ${id} eliminado`
                return supr
                
            } else {
                const error = 'ID de producto inexistente'
                return error
            }
        } catch (err) {
            console.log(err)
        }
    } 
} 

module.exports = Contenedor