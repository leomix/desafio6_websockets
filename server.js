import express from 'express'
const app = express();
import { Server } from 'http'
import { Server as Socket} from "socket.io";
const httpServer = new Server(app)
const io = new Socket(httpServer);

import { Contenedor } from './contenedor.js'
import { ContenedorFile } from './contenedorFile.js'
let contenedor1 = new Contenedor()
let contenedorFile1 = new ContenedorFile('chat.txt')
const PORT = process.env.PORT || 8080
io.on('connection', async client => {
    console.log('cliente conectado')
    io.sockets.emit('productos', await contenedor1.getAll())
    io.sockets.emit('chat', await contenedorFile1.getAll())

    client.on('enviarProducto', async data => { 
    await contenedor1.post(data) ?? {error:'error al guardar'}
    io.sockets.emit('productos', await contenedor1.getAll())
    });

    client.on('enviarChat', async data => { 
        data.fecha = new Date().toLocaleString()
    await contenedorFile1.post(data) ?? {error:'error al guardar'}
    io.sockets.emit('chat', await contenedorFile1.getAll())
    });


    client.on('disconnect', () => { 
        console.log('cliente desconectado')
     });
  });
  app.get('/',(req,res)=>{
        res.render("main")
    })

app.set('view engine', 'ejs');
app.set('views','./views')

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))


const server = httpServer.listen(PORT,()=>{
    console.log(`servidor http escuchando en el puerto ${server.address().port}`)
})

server.on('error',error=> console.log(`error en el servidor ${error}`))
