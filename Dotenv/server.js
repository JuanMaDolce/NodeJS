const parseArgs = require ('minimist')
const app = require('./config')

const options = parseArgs(process.argv)

const PORT = options.port || 8080 

app.listen(PORT, ()=>{
    console.info(`Server is running on port ${PORT}`)
})