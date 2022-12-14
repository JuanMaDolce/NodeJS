import http from 'http'

// GET PRODUCTOS ---------------------------------------------------------------------------------------------------

const opcionesProductos = {
    hostname: 'localhost',
    port: 8080,
    path: '/api/productos',
    method: 'GET'
}

const reqProductos = http.request(opcionesProductos, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', x => {
        process.stdout.write(x)
    })
})

reqProductos.on('error', error => {
    console.log(error)
})

reqProductos.end()

// GET PRODUCTO UNITARIO ---------------------------------------------------------------------------------------------------

const opcionesProducto = {
    hostname: 'localhost',
    port: 8080,
    path: '/api/productos/6366b4adc8bbce72c9350c23',
    method: 'GET'
}

const reqProducto = http.request(opcionesProducto, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', x => {
        process.stdout.write(x)
    })
})

reqProducto.on('error', error => {
    console.log(error)
})

reqProducto.end()

// ADD PRODUCTO  ---------------------------------------------------------------------------------------------------

const data = JSON.stringify(
    {
        "title": "Tabla",
        "price": "200",
        "thumbnail": "Test"
    }
)

const opcionesAgregar = {
    hostname: 'localhost',
    port: 8080,
    path: '/api/productos',
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
        'Content-length': data.length
    }
}

const addProduct = http.request(opcionesAgregar, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', x => {
        process.stdout.write(x)
    })
})

addProduct.on('error', error => {
    console.log(error)
})

addProduct.write(data)
addProduct.end()

// MODIFICA PRODUCTO UNITARIO ---------------------------------------------------------------------------------------------------

const dataDos = JSON.stringify(
    {
        "title": "Piano",
        "price": "200",
        "thumbnail": "Test"
    }
)

const opcionesModificar = {
    hostname: 'localhost',
    port: 8080,
    path: '/api/productos/639650e43aa4b04cc6cf804f',
    method: 'PUT', 
    headers: {
        'Content-Type': 'application/json',
        'Content-length': dataDos.length
    }
}

const updateProduct = http.request(opcionesModificar, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('dataDos', x => {
        process.stdout.write(x)
    })
})

updateProduct.on('error', error => {
    console.log(error)
})

updateProduct.write(dataDos)
updateProduct.end()

// ELIMINA PRODUCTO UNITARIO ---------------------------------------------------------------------------------------------------

const deleteOptions = {
    hostname: 'localhost',
    port: 8080,
    path: '/api/productos/639651ee3aa4b04cc6cf805c',
    method: 'DELETE'
}

const deleteProducto = http.request(deleteOptions, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', x => {
        process.stdout.write(x)
    })
})

deleteProducto.on('error', error => {
    console.log(error)
})

deleteProducto.end()