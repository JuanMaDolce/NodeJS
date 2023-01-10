import mongoose from "mongoose"

const OrdenSchema = new mongoose.Schema({
    
    pedido: {
        type: String,
        required: true
    },
    items: {type: 
        Array
    },
    horario:{
        type: Date,
        immutable: true,
    },
    estado: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true
    }
})
mongoose.models = {}

export default mongoose.model('Orden', OrdenSchema)