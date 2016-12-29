var Author = require('./author.js')
var Book = require('./book.js')
var Comment = require('./comment.js')
var User = require('./user.js')
var async = require('async')
var debug = require('debug')('library:models')

function search(obj, cb) {

  debug(obj)
  var regex = new RegExp(obj.query, 'i')
  debug(regex)
  async.series([
    function(callback) {
      Author.find({name: regex}).exec(function(err, authors) {
        
        callback(err, authors)
      })
    },
    function(callback) {
      Book.find({name:regex}).exec(function(err, books) {
        callback(err, books)
      })
      }
  ], 
    function(err, results) {
      cb(err, {authors: results[0], books: results[1]})
    }
  )
}
module.exports = {

  Author: Author,
  Book: Book,
  Comment: Comment,
  User: User,

  search: search
}