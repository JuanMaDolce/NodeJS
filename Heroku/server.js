const app = require('./config')

const PORT = process.env.PORT 

app.listen(PORT, ()=>{
    console.info(`Server is running on port ${PORT}`)
})