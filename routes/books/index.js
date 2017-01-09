var express = require('express')
var router = express.Router()
var models = require('../../models'),
    Book = models.Book,
    Author = models.Author,
    Comment = models.Comment
var debug = require('debug')('library:books')
var async = require('async')


router.get('/', function(req, res) {
  res.redirect('/search?type=book')
})


router.get('/:id', function (req, res) {
  var id = req.params.id

  models.Book.findById(id).populate('author').exec(function(err, book) {
    res.render('pages/books/view', { book: book})
  })

})

router.post('/:id', global.requiredUser, function (req, res) {
  var user_id = req.body.user_id
  var book_id = req.body.book_id
  var text = req.body.text

  async.series([
    function (callback) {
      var comment = new Comment({ user: user_id, text: text, book: book_id })
      comment.save(callback)
    }
  ], function (err, results) {
    var comment = results[0]
    debug(comment)
   

    req.flash('success', 'Comment posted succesfully')
    res.redirect(res.locals.helpers.getBookUrl(book_id))
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
      book.release_date = req.body.release_date
      book.price = req.body.price

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

module.exports = router
