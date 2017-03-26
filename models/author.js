var debug = require('debug')('library:author')
var mongoose = require('mongoose')

var authorSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,  
  },
  summary: String
})

var Author = mongoose.model('Author', authorSchema)

module.exports = Author
