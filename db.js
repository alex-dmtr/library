var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/library')
var debug = require('debug')('library:db')

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    debug('connected to database')
}) 