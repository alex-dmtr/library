var router = require('express').Router()

router.use('/', require('./home'))
router.use('/api', require('./api'))
router.use('/authors', require('./authors'))
router.use('/books', require('./books'))
router.use('/search', require('./search'))
router.use('/users', require('./users'))

module.exports = router

