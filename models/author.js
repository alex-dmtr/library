var debug = require('debug')('library:author')
var mongoose = require('mongoose')

var authorSchema = mongoose.Schema({
  name: String,
  summary: String
})

var Author = mongoose.model('Author', authorSchema)

module.exports = Author
