const app = require('./config')

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.info(`Server is running on port ${PORT}`)
})