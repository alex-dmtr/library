var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
    console.log('contest requested')
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({message:'Hello world!'}))

})
module.exports = router
