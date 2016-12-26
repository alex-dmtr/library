var express = require('express')
var router = express.Router()
var Author = require('../models/author')
var debug = require('debug')('library:authors')

router.get('/', function(req, res) {

    Author.find(function(err, rows) {
        if (err)
            debug(err)
        
        res.render('pages/authors/index', {rows: rows})
    })
})

router.get('/view', function(req, res) {
    var id = req.query._id

    Author.findById(id, function(err, doc) {
        res.render('pages/authors/view', { author: doc})
    })
})
router.get('/add', function(req, res) {
    res.render('pages/authors/add')
})

router.post('/add', function(req, res) {


    var newAuthor = new Author({
        name: req.body.name
    })

    newAuthor.save((err, product) => {
        if (err)
            debug(err)
        else
            debug(product)

        res.redirect('/authors')
    })
})
module.exports = router