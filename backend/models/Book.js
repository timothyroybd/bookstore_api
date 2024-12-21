const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: {type: String, required: true, unique: true},
    author: {type: String, required: true},
    description: {type: String, required: true}, 
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book