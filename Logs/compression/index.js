const express = require('express')
const compression = require('compression')

const app = express()
app.use(compression()) // puedo usarlo en una ruta y otra no

const port = 4000

app.get('/', (req,res)=>{
    res.send('hello World')
})

app.listen(port, err =>{
    if (err){
        console.log('Error', err)
    } else {
        console.log('Server is running on port 4000')
    }
})