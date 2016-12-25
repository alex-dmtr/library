var express = require('express')
var router = express.Router()
var Book = require('../models/book')
var Author = require('../models/author')
var debug = require('debug')('library:books')

router.get('/', function(req, res, next) {

    Book.find(function(err, rows) {
        res.render('pages/books/index', {rows: rows})
    })
})
router.get('/add', function(req, res, next) {


})

router.post('/add', function(req, res, next) {
    var the_raven = new Book({
    name: 'The Raven',
    author: 'Edgar Allen Poe'
    })

    the_raven.save((err, product) => {
        if (err)
            debug(err)
        else
            debug(product)

        res.redirect('/')
    })
})



module.exports = router