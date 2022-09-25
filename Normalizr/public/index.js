const socket = io().connect()

const addProduct = (evt) =>{
    let producto = 0
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
                    <td><img src=${prod.foto} alt="Imagen"></td>
                    </tr>
                </tbody>
                </table>`
    })
    listado.innerHTML = html.join(' ')
}  



const addMessage = (evt) =>{
    const id = document.getElementById('id').value
    const nombre = document.getElementById('nombre').value
    const apellido = document.getElementById('apellido').value
    const edad = document.getElementById('edad').value
    const alias = document.getElementById('alias').value
    const avatar = document.getElementById('avatar').value
    const mensaje = document.getElementById('mensaje').value
    const time = new Date()
    const horario = time.toLocaleString()
    const post = {
        author: {
            id,
            nombre, 
            apellido, 
            edad, 
            alias,
            avatar
        },
        text: mensaje,
        horario
    }
    socket.emit('chat-nuevo', post)
    return false
}

const renderMessage = (listaMensajes) =>{
    
    let chat = document.getElementById('chat')
    let html = listaMensajes.result.map(msj => {
        return`<table class="table table-striped k col-3">
                <thead>
                    <tr>
                    <th scope="col-3">Usuario</th>
                    <th scope="col-3">Mensaje</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row"><p id="user">${msj.author}</p><p id="timer">${msj.horario}</p></th>
                    <td><p id="message">${msj.text}</p></td>            
                    </tr>
                </tbody>
                </table>`
    })
    chat.innerHTML = html.join(' ')

    const authorSchema = new normalizr.schema.Entity('author', {}, {idAttribute: "id"});
    const comentSchema = new normalizr.schema.Entity('text');
    const postSchema =[{
        author: authorSchema,
        text: comentSchema
    }]

    const denormalizeMensajes = normalizr.denormalize(listaMensajes.result, postSchema, listaMensajes.entities)

    const porcentaje = 100 - (( JSON.stringify(listaMensajes).length * 100) / JSON.stringify(denormalizeMensajes).length)

    document.getElementById('porcenaje').innerHTML = `%${porcentaje.toFixed(2)}`
}


socket.on('productos-server', listaProductos =>{
    render(listaProductos)
}) 
socket.on('mensajes-server', listaMensajes =>{
    renderMessage(listaMensajes)
}) 

