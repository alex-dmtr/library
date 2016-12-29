var express = require('express')
var router = express.Router()
var Comment = require('../models/comment')
var debug = require('debug')('library:comments')

router.get('/:id', function(req, res) {
  var id = req.params.id

  debug(id)
  Comment.findById(id).populate('user').exec(function(err, comment) {
    debug(comment)
    res.render('partials/comment', {comment: comment})
  })
})

module.exports = router