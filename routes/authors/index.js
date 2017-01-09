var express = require('express')
var router = express.Router()
var Book = require('../../models/book')
var Author = require('../../models/author')
var debug = require('debug')('library:authors')
var async = require('async')

// var helpers = app.locals.helpers

router.get('/', function(req, res)  {
  res.redirect('/search?type=author')
})

router.get('/add', function (req, res) {
  res.render('pages/authors/add')
})

router.post('/add', function (req, res) {
  var newAuthor = new Author({
    name: req.body.name
  })

  newAuthor.save((err, product) => {
    if (err) {
      debug(err)
    } else {
      debug(product)
    }

    res.redirect('/authors')
  })
})

router.get('/:id', function (req, res) {
  var id = req.params.id

  async.series([
    function (callback) {
      Author.findById(id).exec(callback)
    },
    function (callback) {
      Book.find({author: id}).exec(callback)
    }
  ],
      function (err, results) {
        if (err) {
          debug(err)
          req.flash('error', err)
        }
        res.render('pages/authors/view', {author: results[0], books: results[1]})
      })
})

router.get('/:id/json', function(req, res) {
  var id = req.params.id

  Author.findById(id).exec(function (err, doc) {
    res.setHeaderType('Content-Type', 'application/json')
    res.send(doc)
  })
})

router.get('/:id/edit', global.requiredAdmin, function (req, res) {
  var id = req.params.id

  Author.findById(id).exec(function (err, results) {
    res.render('pages/authors/edit', { author: results })
  }
      )
})

router.post('/:id/edit', global.requiredAdmin, function (req, res) {
  var id = req.params.id
  Author.findById(id, function (err, author) {
    if (err) {
      debug(err)
      req.flash('error', err)
      res.redirect('/authors/edit?_id=' + author._id)
    } else {
      author.name = req.body.name
      author.summary = req.body.summary

      author.save(function (err, updatedAuthor) {
        if (err) {
          req.flash('error', err)
        } else {
          req.flash('success', 'Author saved')
        }

        debug(updatedAuthor)
        res.redirect('/authors/edit?_id=' + author._id)
      })
    }
  })
})

module.exports = router