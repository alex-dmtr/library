var Promise = require('bluebird')
var mongoose = require('mongoose')
mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/library')
var debug = require('debug')('library:db')

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  debug('connected to database')
})

var Author = require('./author.js')
var Book = require('./book.js')
var Comment = require('./comment.js')
var User = require('./user.js')
var async = require('async')
var debug = require('debug')('library:models')

function search (obj, cb) {
  debug(obj)
  var regex = new RegExp(obj.query, 'i')
  debug(regex)
  async.series([
    function (callback) {
      Author.find({name: regex}).exec(function (err, authors) {
        callback(err, authors)
      })
    },
    function (callback) {
      Book.find({name: regex}).exec(function (err, books) {
        callback(err, books)
      })
    }
  ],
    function (err, results) {
      cb(err, {authors: results[0], books: results[1]})
    }
  )
}

function truncate() {
   return Author.remove({}).then(function() {
      return Book.remove({})
    })
}

module.exports = {

  Author,
  Book,
  Comment,
  User,

  search,
  truncate,
  seed: require('./seed')({Author, Book})
}
