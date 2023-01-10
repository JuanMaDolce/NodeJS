import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true
    },
    mensaje: {
        type: String,
        required: true
    },
    horario:{
        type: Date,
        default: () => Date.now(),
        immutable: true,
    }
})

export default mongoose.model('Chat', ChatSchema)