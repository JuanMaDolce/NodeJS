import app from './config.js'
import logger from './src/logs/logs.js'
import cluster from 'cluster'
import { cpus } from 'os'
import { createServer } from "http";
import { Server } from "socket.io";
import {mensajes} from './src/routes/routerChat.js';


const httpServer = createServer(app);  // Socket
export const io = new Server(httpServer);  // Socket

io.on("connection", (socket) => {  // Inicio Socket
    console.log('connected') 

    mensajes(socket,io)

});

const numCPUs = cpus().length

const PORT = process.env.PORT || 3000

const MODO = process.argv[2] || 'FORK' 

if(MODO === 'CLUSTER' && cluster.isPrimary){  // Configuración del inicio del servidor
    logger.info(`Primary ${process.pid} is running`)
    for(let i = 0; i < numCPUs; i++){
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) =>{
        logger.info(`${worker.processs.pid} died`)
    })
} else {
    httpServer.listen(PORT, ()=>{
        logger.info(`Server is running on port ${PORT}`)
    }) 
    logger.info(`${process.pid} started`)
} 

