const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const url = `mongodb+srv://${process.env.KEY_USER}:${process.env.KEY_PASSWORD}@cluster0.ckxejzf.mongodb.net/?retryWrites=true&w=majority`
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB