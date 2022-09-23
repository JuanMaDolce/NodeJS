const { Console } = require('console')
const express = require('express')
const {Router} = express
const Contenedor = require("./contenedor");

const contenedor = new Contenedor

const app = express()
const router = Router()

app.use(express.json())
app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))

router.post('/', (req, res)=>{
    const {title,price,thumbnail} = req.body
    const rta = contenedor.save(title,price,thumbnail)
    const f = async () =>{
        res.json(await rta)
    }
    f()
})


router.get('/', (req,res)=>{
    const list = contenedor.getAll()
    const f = async () =>{
        res.json(await list)
    }
    f()
})

router.get('/:id', (req,res)=>{
    const {id} = req.params
    const product = contenedor.getById(Number(id))
    const f = async () =>{
        res.json(await product)
    }
    f()
})

router.delete('/:id', (req,res)=>{
    const {id} = req.params
    const result = contenedor.deleteById(Number(id))
    const f = async () =>{
        res.json(await result)
    }
    f()
}) 

router.put('/:id', (req,res)=>{
    const {id} = req.params
    const {title,price,thumbnail} = req.body
    const rta = contenedor.upload(Number(id),title,price,thumbnail)
    const f = async () =>{
        res.json(await rta)
    }
    f()  
})

const PORT = process.env.PORT || 8080
app.use('/api/productos', router)
app.listen(PORT, ()=>{
    console.log('Server is running on port 8080')
})