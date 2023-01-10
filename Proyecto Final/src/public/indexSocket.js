const socket = io()

// Configuración complentaria del Chat, visualización y envío de mensajes

const addMessage = (evt) =>{
    const usuario = document.getElementById('usuario').value
    const mensaje = document.getElementById('mensaje').value
    const time = new Date()
    const horario = time.toLocaleString()
    const mensajes = {
        usuario,
        mensaje
    }

    socket.emit('chat-nuevo', mensajes )
    return false
}

const renderMessage = (listaMensajes) =>{
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

socket.on('mensajes-server', listaMensajes =>{
    renderMessage(listaMensajes)
})
