const parseArgs = require ('minimist')
const app = require('./config')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length

const options = parseArgs(process.argv)
const PORT = parseInt(process.argv[2]) || 8080 

console.log(PORT)

const server = options.modo || 'fork' 

/* if(cluster.isPrimary){
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
} */

app.listen(PORT, ()=>{
    console.info(`Server is running on port ${PORT}`)
}) 



