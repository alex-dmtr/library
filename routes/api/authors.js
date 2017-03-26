var express = require('express')
var router = express.Router()
var Author = require('../../models/author')

router.get('/', function(req, res) {
  Author
    .find()
    .then(function(authors) {
      res.status(200).json(authors)
    })
})


module.exports = router