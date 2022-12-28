import { red, blue, green, bgBlack } from "https://deno.land/std@0.168.0/fmt/colors.ts"
import chalk from "https://deno.land/x/chalk_deno@v4.1.1-deno/source/index.js"


export const coloresDb: [] = [];

export const colores = async (ctx) => {
    const body = ctx.request.body({type: "form"})
    const value = (await body.value).get("color")
        if(value === 'red'){
            const rojo = chalk.bgBlack(red('red'))
            console.log(rojo)
            coloresDb.push(rojo)
        } else if(value === 'green'){
            const verde = chalk.bgBlack(green('green'))
            coloresDb.push(verde)
        } else if(value === 'blue'){
            const azul = chalk.bgBlack(blue('azul'))
            coloresDb.push(azul)
        } 
        ctx.response.redirect("/");
}
