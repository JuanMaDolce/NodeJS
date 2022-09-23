const express = require('express')
const multer = require('multer')

const app = express()

app.use(express.static(__dirname + 'public'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage})

app.post('/uploadfile', upload.single('myFile'), (req,res,next) =>{
    const {file} = req
    if(!file){
        const error = new Error ('Please uplead file')
        error.httpStatusCode = 400
        return next(error)
    }
    console.log(file)
})

app.get('/api', (req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(4000, () =>{
    console.log('Server on port 4000')
})