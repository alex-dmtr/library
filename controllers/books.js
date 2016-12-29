var express = require('express')
var router = express.Router()
var Book = require('../models/book')
var Author = require('../models/author')
var Comment = require('../models/comment')
var debug = require('debug')('library:books')
var async = require('async')

module.exports = function (app) {
  var helpers = app.locals.helpers

//   router.get('/', function(req, res, next) {

//       var query = req.query.query ? req.query.query : ''

//       var regex = new RegExp(query, 'i')
//       debug(regex)
//       Book.find({name: regex}).populate('author').exec(function(err, rows) {
//           res.render('pages/books/index', {rows: rows, query: query})
//       })
//   })

  router.get('/:id', function (req, res) {
    var id = req.params.id

    Book.findById(id).populate('author').exec(function (err, doc) {
      res.render('pages/books/view', { book: doc})
    })
  })

  router.post('/:id', global.requiredUser, function (req, res) {
    var user_id = req.body.user_id
    var book_id = req.body.book_id
    var text = req.body.text

    async.series([
      function (callback) {
        Book.findById(book_id).exec(callback)
      },
      function (callback) {
        var comment = new Comment({ user: user_id, text: text })
        comment.save(callback)
      }
    ], function (err, results) {
      var book = results[0]
      var comment = results[1][0]
      debug(comment)
      if (book.comments == null) {
        book.comments = []
      }

      book.comments.push(comment._id)

      book.save(function (err, book) {
        req.flash('success', 'Comment posted succesfully')
        res.redirect(helpers.getBookUrl(book._id))
      })
    })
  })

  router.get('/:id/edit', global.requiredAdmin, function (req, res) {
    var id = req.params.id

    async.series([
      function (callback) {
        Book.findById(id).populate('author').exec(callback)
      },
      function (callback) {
        Author.find().exec(callback)
      }],
          function (err, results) {
            res.render('pages/books/edit', { book: results[0], authors: results[1] })
          }
      )
  })

  router.post('/:id/edit', global.requiredAdmin, function (req, res) {
    Book.findById(req.params.id, function (err, book) {
      if (err) {
        debug(err)
        req.flash('error', err)
        res.redirect('/books/edit?_id=' + book._id)
      } else {
        book.name = req.body.name
        book.author = req.body.author
        book.summary = req.body.summary
        book.description = req.body.description

        book.save(function (err, updatedBook) {
          if (err) { req.flash('error', err) } else { req.flash('success', 'Book saved') }

          debug(updatedBook)
          res.redirect('/books/edit?_id=' + book._id)
        })
      }
    })
  })

  router.get('/add', function (req, res, next) {
    Author.find(function (err, rows) {
      res.render('pages/books/add', {authors: rows})
    })
  })

  router.post('/add', function (req, res, next) {
    var newBook = new Book({
      name: req.body.name,
      author: req.body.author
    })

    newBook.save((err, product) => {
      if (err) { debug(err) } else {
        debug(product)
      }

      res.redirect('/books')
    })
  })

  return router
}

