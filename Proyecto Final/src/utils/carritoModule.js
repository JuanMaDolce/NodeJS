import mongoose from "mongoose"

const CarritoSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    productos: {type: Array}
})

export default mongoose.model('Carrito', CarritoSchema)