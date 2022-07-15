const socket = io.connect();

function enviarProducto(){
    const producto = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        url: document.getElementById('url').value
    }
    socket.emit('enviarProducto', producto);

    return false;
}

socket.on('productos', async productos => {
    let html = await renderProductos(productos)
    document.getElementById('productos').innerHTML = html
});

async function renderProductos(productos) {
    return fetch('partials/tabla.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}

function enviarChat(){
    const chat = {
        email: document.getElementById('email').value,
        mensaje: document.getElementById('mensaje').value
    }

    socket.emit('enviarChat', chat);
    return false;
}
socket.on('chat', async chat => {
    const html = await renderChat(chat)
    document.getElementById('chat').innerHTML = html
});

function renderChat(chat) {
    return fetch('partials/chat.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ chat })
            return html
        })
}