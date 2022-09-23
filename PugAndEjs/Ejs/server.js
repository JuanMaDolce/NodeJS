const express = require ('express')
const app = express()

app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.urlencoded({extended: true}))

let productos = [
    {
        title: "Celular",
        price: 100000,
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLBe9IALeU_ueNTJrif2j-96BWjGx_7_A6SgMlnNqrxATeqGGq3pHKhyx-JoqxxEaVGdI&usqp=CAU",
        id: 1
    },
    {
        title: "Tablet",
        price: 150000,
        thumbnail: "https://www.macstation.com.ar/img/productos/2907-2829-2450-1.jpg",
        id: 2
    },
    {
        title: "Notebook",
        price: 200000,
        thumbnail: "https://cnnespanol.cnn.com/wp-content/uploads/2021/10/MacBook-2.jpg?quality=100&strip=info",
        id: 3
    }
]

app.get('/productos', (req,res)=>{
    res.render('index',{
        productos
    })
})

app.get('/', (req,res)=>{
    res.render('./partials/form',{
    })
})

app.post('/', (req, res)=>{
    const {title,price,thumbnail} = req.body
    const product = {
        title,
        price,
        thumbnail
    }
    productos.push(product)
    res.render('./partials/form', {
    })
})

const port = process.env.PORT || 4000

app.listen(port, err =>{
    if (err) throw new Error (`Error on server listen: ${err} `)
    console.log(`Server running port ${port}`)
})


