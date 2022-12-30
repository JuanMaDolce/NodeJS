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
    ctx.body = {
        rta
    }
})

routerProductos.post('/', async (ctx) =>{
    const producto = await ctx.request.body
    const agregarProducto = await apiProductos.save(producto)
    ctx.body = agregarProducto
})

routerProductos.put('/:id', async (ctx) =>{
    const producto = await ctx.request.body
    const id = await ctx.params.id
    const productoMod = await apiProductos.upload(id,producto)
    ctx.body = productoMod
})


routerProductos.delete('/:id', async ctx =>{
    const id = ctx.params.id
    const rta = await apiProductos.deleteById(id)
    ctx.body = {
        rta
    }
}) 

export default routerProductos