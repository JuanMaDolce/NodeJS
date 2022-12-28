import { Application, viewEngine,oakAdapter, ejsEngine } from "./types/deps.ts";
import { denoRouter } from "./routes/denoroutes.ts";
import { config } from "./types/deps.ts";
import { MongoClient } from "./types/deps.ts";

const configData = await config()
const PORT = configData['PORT'] || 8080

const app = new Application()

app.use(
    viewEngine(oakAdapter, ejsEngine, {
        viewRoot: "./views",
    })
);

app.use(denoRouter.routes());
app.use(denoRouter.allowedMethods())


await app.listen(
    {port: Number(PORT)},
    console.log(`Escuchando el puerto ${PORT}`)
)