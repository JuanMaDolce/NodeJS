import { Router } from "../types/deps.ts";
import { colores } from "../controlador/controlador.ts";
import { coloresDb } from "../controlador/controlador.ts";


export const denoRouter = new Router()

denoRouter
    .get('/',(ctx) => {
    ctx.render('form.ejs',{ coloresDb })
    })
    .post('/', colores)