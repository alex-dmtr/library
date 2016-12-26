var express = require('express')
var router = express.Router()
var Book = require('../models/book')
var Author = require('../models/author')
var debug = require('debug')('library:books')

router.get('/', function(req, res, next) {

    Book.find().populate('author').exec(function(err, rows) {
        res.render('pages/books/index', {rows: rows})
    })
})

router.get('/view', function(req, res) {
    var id = req.query._id

    Book.findById(id).populate('author').exec(function(err, doc) {
        res.render('pages/books/view', { book: doc})
    })
})

router.get('/get', function(req, res, next) {
    var id = req.query._id

    Book.findById(id, function(err, doc) {

        doc.getAuthor((err, author) => {

            doc.author = author
            res.setHeader('Content-Type', 'application/json');
            res.send(doc)
            
        })
    })
})

router.get('/add', function(req, res, next) {

    Author.find(function(err, rows) {
        res.render('pages/books/add', {authors: rows})
    })
})

router.post('/add', function(req, res, next) {
    var newBook = new Book({
    name: req.body.name,
    author: req.body.author
    })

    newBook.save((err, product) => {
        if (err)
            debug(err)
        else
            debug(product)

        res.redirect('/books')
    })
})





module.exports = router