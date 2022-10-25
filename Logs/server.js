const app = require('./config')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length

const PORT = parseInt(process.argv[2]) || 8080 
const modoCluster = process.argv[3] == 'CLUSTER' 

isPrime = (num) => {
    if ([2,3].includes(num)) return true
    else if(([2,3]).some(n=>num % n == 0)) return false
    else {
        let i = 5, w = 2;
        while ((i ** 2) <= num){
            if (num % i == 0)
            return false
            i += w
            w = 6 - w
        }
    }
    return true
}

if(modoCluster && cluster.isPrimary){

    console.log(`Numero de procesadores, ${numCPUs}`)
    console.log(`PID PRIMARY, ${process.pid}`)

    for (let i = 0; i < numCPUs; i++){
        cluster.fork()
    }

    cluster.on('exit', worker =>{
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })
} else {
    app.get('/', (req,res)=>{
        const primes = []
        const max = Number(req.query.max) || 1000
        for (let i = 1; i <= max; i++){
            if(isPrime(i)) primes.push(i)
        }
        res.json(primes)
    })
    app.listen(PORT, ()=>{
        console.info(`Server is running on port ${PORT}`)
        console.log(`PID WORKER ${process.pid}`)
    }) 
}







