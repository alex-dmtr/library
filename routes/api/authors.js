var express = require('express')
var router = express.Router()
var Author = require('../../models/author')

router.get('/', function(req, res) {
  Author
    .find()
    .lean()
    .then(function(authors) {
      res.status(200).json(authors)
    })
})

router.post('/', function(req, res) {
  Author
    .create(req.body)
    .then(function(result) {
      res.status(200).json(result)
    })
})

router.get('/:authorId', function(req, res) {
  Author
    .findById(req.params.authorId)
    .then(function(author) {
      res.status(200).json(author)
    })
    .catch(function(err) {
      res.status(404).send("Not found")
    })
})

router.delete('/:authorId', function(req, res) {
  Author
    .findByIdAndRemove(req.params.authorId)
    .then(() => {
      res.status(200).send("OK")
    })
    .catch(() => {
      res.status(403).send("Bad request")
    })
})


module.exports = router