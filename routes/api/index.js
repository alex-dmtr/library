var express = require('express')
var router = express.Router()

router.get('/authors/:author_id', require('./getAuthor'))

router.get('/search', require('./search'))




// router.get('/books/:book_id', require('getBook'))

// router.post('/authors/', require('postAuthor'))
// router.post('/books/', require('postBook'))

module.exports = router