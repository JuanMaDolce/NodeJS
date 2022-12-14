import axios from 'axios'

(async function testAxios(){
    const url = 'http://localhost:8080/api/productos'

    try{
        const id = '63964b713aa4b04cc6cf8039'

        const product = {
            title: "Arbol",
            price: 200,
            thumbnail: "Test"
        }
        const newProduct = {
            id: "63964af53aa4b04cc6cf8035",
            title: "Mesa",
            price: 100,
            thumbnail: "Test"
        }

        const getProducts = await axios.get(url)
        console.log(getProducts.data)

        const getProduct = await axios.get(`http://localhost:8080/api/productos/${id}`)
        console.log(getProduct.data)

        const addProduct = await axios.post(`http://localhost:8080/api/productos/`,product)
        console.log(addProduct.data)

        const updateProduct = await axios.put(`http://localhost:8080/api/productos/${id}`,newProduct)
        console.log(updateProduct.data)

        const deleteProduct = await axios.delete(`http://localhost:8080/api/productos/${id}`)
        console.log(deleteProduct.data)

    } catch (err) {
        console.log(err)
    } 
    
})()

