var express = require('express')
var router = express.Router()
var Book = require('../../models/book')

router.get('/', function(req, res) {
  Book
    .find()
    .then(function(books) {
      res.status(200).json(books)
    })
})

router.post('/', function(req, res) {
  Book
    .create(req.body)
    .then(function(result) {
      res.status(200).json(result)
    })
})

router.get('/:bookId', function(req, res) {
  Book
    .findById(req.params.bookId)
    .then(function(book) {
      res.status(200).json(book)
    })
    .catch(function(err) {
      res.status(404).send("Not found")
    })
})

router.delete('/:bookId', function(req, res) {
  Book
    .findByIdAndRemove(req.params.bookId)
    .then(() => {
      res.status(200).send("OK")
    })
    .catch(() => {
      res.status(403).send("Bad request")
    })
})


module.exports = router