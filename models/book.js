var debug = require('debug')('library:book')
var mongoose = require('mongoose'),
    Schema = mongoose.Schema


var bookSchema = mongoose.Schema({
    name: String,
    author: { type: Schema.Types.ObjectId, ref: 'Author' },
    summary: String,
    description: String,
    price: Number,
    visible: Boolean
})


var Book = mongoose.model('Book', bookSchema)

module.exports = Book