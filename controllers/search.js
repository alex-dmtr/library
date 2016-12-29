var express = require('express')
var router = express.Router()
var async = require('async')
var models = require('../models')
var debug = require('debug')('library:search')

module.exports = function (app) {
  router.get('/', function (req, res) {
    res.render('pages/search/index', { query: req.query})
  })

  router.get('/json', function (req, res) {
    models.search({ query: req.query.q }, function (err, results) {
      if (err) {
        debug(err)
        req.flash('error', err)
        res.redirect('/')
      } else {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(results))
      }
    }
   )
  })

  return router
}
