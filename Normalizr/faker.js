const {faker} = require('@faker-js/faker')



faker.locale = 'es'
const {name, internet, random} = faker

productosFaker = async () =>{
    const productos = []

    for(let i = 0; i < 6; i++){
        await productos.push({
            nombre: faker.commerce.productName(), 
            precio: faker.commerce.price(), 
            foto: faker.image.technics(300,300,true)
        })
    }
    return productos
}

module.exports = productosFaker()
