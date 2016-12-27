var express = require('express')
var router = express.Router()
var Book = require('../models/book')
var Author = require('../models/author')
var debug = require('debug')('library:authors')
var async = require('async')

router.get('/', function(req, res) {

    var query = req.query.query

    var regex = new RegExp(query, 'i')
    Author.find({name:regex}).exec(function(err, rows) {
        if (err)
            debug(err)
        
        if (rows.length == 1)
            res.redirect('/authors/view?_id=' + rows[0]._id)
        else
            res.render('pages/authors/index', {rows: rows})
    })
})

router.get('/view', function(req, res) {
    var id = req.query._id

    async.series([
        function(callback) {
            Author.findById(id).exec(callback)
        },
        function(callback) {
            Book.find({author:id}).exec(callback)
        }
    ],
        function(err, results) {
            res.render('pages/authors/view', {author: results[0], books: results[1]})
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

router.get('/edit', global.requiredAdmin, function(req, res) {
    var id = req.query._id



    Author.findById(id).exec(function(err, results) {
            res.render('pages/authors/edit', { author: results })
        }
    )
})

router.post('/edit', global.requiredAdmin, function(req, res) {
    Author.findById(req.body._id, function(err, author) {
        if (err) {
            debug(err)
            req.flash('error', err)
            res.redirect('/authors/edit?_id=' + author._id)
        } else {

            author.name = req.body.name
            author.summary = req.body.summary
     
            author.save(function(err, updatedAuthor) {
                if (err)
                    req.flash('error', err)
                else
                    req.flash('success', 'Author saved')

                debug(updatedAuthor)
                res.redirect('/authors/edit?_id=' + author._id)
            })
        }
    })

})

module.exports = router