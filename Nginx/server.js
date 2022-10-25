const parseArgs = require ('minimist')
const app = require('./config')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length


const PORT = parseInt(process.argv[2]) || 8080 

const MODO = process.argv[3] || 'FORK' 

console.log(MODO)

 if(MODO === 'CLUSTER' && cluster.isPrimary){
    console.log(`Primary ${process.pid} is running`)
    for(let i = 0; i < numCPUs; i++){
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) =>{
        console.log(`${worker.processs.pid} died`)
    })
} else {
     app.listen(PORT, ()=>{
        console.info(`Server is running on port ${PORT}`)
    }) 
    console.log(`${process.pid} started`)
} 

/* app.listen(PORT, ()=>{
    console.info(`Server is running on port ${PORT}`)
})  */



