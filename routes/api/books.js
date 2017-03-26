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


module.exports = router