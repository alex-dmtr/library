var debug = require('debug')('library:book')
var mongoose = require('mongoose')


var bookSchema = mongoose.Schema({
    name: String,
    author: String
})


var Book = mongoose.model('Book', bookSchema)

module.exports = Book