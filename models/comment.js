var debug = require('debug')('library:comment')
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var commentSchema = {
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  text: String,
  book: { type: Schema.Types.ObjectId, ref: 'Book'},
  author: { type: Schema.Types.ObjectId, ref: 'Author'}
}

var Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
