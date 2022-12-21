import Router from 'koa-router';
import { apiProductos } from '../daos/index.js'

const routerProductos = new Router({
    prefix: '/api/productos'
})


routerProductos.get('/', async ctx =>{
    const list = await apiProductos.getAll()
    ctx.body = {
        list
    }
})

routerProductos.get('/:id', async ctx =>{
    const id = ctx.params.id

    const rta = await apiProductos.getById(id)
    console.log(rta)
    ctx.body = {
        rta
    }
})

routerProductos.post('/', async ctx =>{
    const nuevoProducto = {
    title: ctx.params.body.title,
    price: ctx.params.body.price,
    thumbnail: ctx.params.body.thumbnail,
    }
    const rta = await apiProductos.save(nuevoProducto)
    ctx.body = {

        rta
    }
})

routerProductos.put('/:id', async ctx =>{
    const id = ctx.params
    console.log(ctx.request)
    const rta = await apiProductos.upload(id,title,price,thumbnail)
    ctx.body = {
        rta
    }

})


routerProductos.delete('/:id', async ctx =>{
    const id = ctx.params.id
    const rta = await apiProductos.deleteById(id)
    ctx.body = {
        rta
    }
}) 

export default routerProductos