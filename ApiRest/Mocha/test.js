import { expect } from "chai";
import supertest from "supertest";

let request

request = supertest('http://localhost:8080/api/productos')

const product = {
    title: "Arbol",
    price: 200,
    thumbnail: "Test"
}
const newProduct = {
    title: "Mesa",
    price: 100,
    thumbnail: "Test"
}

/* const addProduct = await axios.post(`http://localhost:8080/api/productos/`,product)
        console.log(addProduct.data)

        const updateProduct = await axios.put(`http://localhost:8080/api/productos/${id}`,newProduct)
        console.log(updateProduct.data)

        const deleteProduct = await axios.delete(`http://localhost:8080/api/productos/${id}`)
        console.log(deleteProduct.data) */

describe('test de api res full', () =>{

    before(function () {
        console.log('\n ########## INICIO DE TESTEOS ########## \n');
    })

    after(function () {
        console.log('\n ########## FIN DE TESTEOS ##########');
    })

    describe('GET', () =>{
        it('debería retornar un status 200', async () =>{
            const response = await request.get('/')
            expect(response.status).to.eql(200)
        })
    })

    describe('GET', () =>{
        it('debería retornar un status 200', async () =>{
            const response = await request.get('/639652bb3aa4b04cc6cf8064')
            expect(response.status).to.eql(200)
        })
    })

    describe('POST', () =>{
        it('debería retornar un status 200', async () =>{
            const response = await request.post('/').send(product)
            expect(response.status).to.eql(200)
        })
    })

    describe('PUT', () =>{
        it('debería retornar un status 200', async () =>{
            const response = await request.put('/639652bb3aa4b04cc6cf8064').send(newProduct)
            expect(response.status).to.eql(200)
        })
    })

    describe('DELETE', () =>{
        it('debería retornar un status 200', async () =>{
            const response = await request.delete('/639652bb3aa4b04cc6cf8064')
            expect(response.status).to.eql(200)
        })
    })
})


