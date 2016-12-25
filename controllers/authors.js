var express = require('express')
var router = express.Router()
var Author = require('../models/author')
var debug = require('debug')('library:authors')

router.get('/', function(req, res, next) {

    Author.find(function(err, rows) {
        if (err)
            debug(err)
        
        res.render('pages/authors/index', {rows: rows})
    })
})

router.get('/add', function(req, res, next) {
    res.render('pages/authors/add')
})
router.post('/add', function(req, res, next) {


    var poe = new Author({
        name: req.body.name
    })

    poe.save((err, product) => {
        if (err)
            debug(err)
        else
            debug(product)

        res.redirect('/authors')
    })
})
module.exports = router