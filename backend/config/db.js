
const mongoose = require('mongoose')

const mongoURI = process.env.mongoURI


mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(()=> {
    console.log('MongoDB connected')
}).catch(err => {
    console.error('connection error', err)
})