var express = require('express')
var router = express.Router()

router.use('/authors', require('./authors'))
router.use('/books', require('./books'))
router.use('/search', require('./search'))
// router.get('/authors/:author_id', require('./getAuthor'))
// router.get('/books/:book_id/comments', require('./getBookComments'))
// router.get('/users/:user_id', require('./getUser'))
// router.get('/search', require('./search'))




// router.get('/books/:book_id', require('getBook'))

// router.post('/authors/', require('postAuthor'))
// router.post('/books/', require('postBook'))

module.exports = router