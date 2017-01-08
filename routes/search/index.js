var express = require('express')
var router = express.Router()
var async = require('async')
var models = require('../../models')
var debug = require('debug')('library:search')

router.get('/', function (req, res) {
  res.render('pages/search/index', { query: req.query})
})

module.exports = router
