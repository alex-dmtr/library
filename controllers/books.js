var express = require('express')
var router = express.Router()
var Book = require('../models/book')
var Author = require('../models/author')
var debug = require('debug')('library:books')
var async = require('async')

router.get('/', function(req, res, next) {

    var query = req.query.query ? req.query.query : ''

    var regex = new RegExp(query, 'i')
    debug(regex)
    Book.find({name: regex}).populate('author').exec(function(err, rows) {
        res.render('pages/books/index', {rows: rows, query: query})
    })
})

router.get('/view', function(req, res) {
    var id = req.query._id

    Book.findById(id).populate('author').exec(function(err, doc) {
        res.render('pages/books/view', { book: doc})
    })
})

router.get('/edit', global.requiredAdmin, function(req, res) {
    var id = req.query._id


    async.series([
        function(callback) {
            Book.findById(id).populate('author').exec(callback)
        },
        function(callback) {
            Author.find().exec(callback)
        }],
        function(err, results) {
            res.render('pages/books/edit', { book: results[0], authors: results[1] })
        }
    )

})

router.post('/edit', global.requiredAdmin, function(req, res) {
    Book.findById(req.body._id, function(err, book) {
        if (err) {
            debug(err)
            req.flash('error', err)
            res.redirect('/books/edit?_id=' + book._id)
        } else {

            book.name = req.body.name
            book.author = req.body.author
            book.summary = req.body.summary
            book.description = req.body.description

            book.save(function(err, updatedBook) {
                if (err)
                    req.flash('error', err)
                else
                    req.flash('success', 'Book saved')

                debug(updatedBook)
                res.redirect('/books/edit?_id=' + book._id)
            })
        }
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