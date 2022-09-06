const socket = io()

const addProduct = (evt) =>{
    const nombre = document.getElementById('nombre').value
    const precio = document.getElementById('precio').value
    const url = document.getElementById('url').value

    const producto = {
        nombre,
        precio,
        url
    }
    console.log(producto)

    socket.emit('producto-nuevo', producto)
    return false
}
const render = (listaProductos) =>{
    let listado = document.getElementById('listado')
    let html = listaProductos.map(prod => {
        return`<table class="table table-striped     col-1 mb-2">
                <thead>
                    <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">${prod.nombre}</th>
                    <td>${prod.precio}</td>
                    <td><img src=${prod.url} alt="Imagen"></td>
                    </tr>
                </tbody>
                </table>`
    })
    listado.innerHTML = html.join(' ')
}



const addMessage = (evt) =>{
    const usuario = document.getElementById('usuario').value
    const mensaje = document.getElementById('mensaje').value
    const time = new Date()
    const horario = time.toLocaleString()
    const mensajes = {
        usuario,
        mensaje,
        horario
    }
    socket.emit('chat-nuevo', mensajes)
    return false
}

const renderMessage = (listaMensajes) =>{
    console.log(listaMensajes)
    let chat = document.getElementById('chat')
    let html = listaMensajes.map(msj => {
        return`<table class="table table-striped k col-3">
                <thead>
                    <tr>
                    <th scope="col-3">Usuario</th>
                    <th scope="col-3">Mensaje</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row"><p id="user">${msj.usuario}</p><p id="timer">${msj.horario}</p></th>
                    <td><p id="message">${msj.mensaje}</p></td>
                    </tr>
                </tbody>
                </table>`
    })
    chat.innerHTML = html.join(' ')
}

socket.on('productos-server', listaProductos =>{
    render(listaProductos)
})
socket.on('mensajes-server', listaMensajes =>{
    renderMessage(listaMensajes)
    
}) 

