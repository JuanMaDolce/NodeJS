const mongoose = require('mongoose')


const UsersSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        trim: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        trim: true,
        max: 50,
    }
})

module.exports = mongoose.model('Users', UsersSchema)