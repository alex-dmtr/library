var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var userSchema = Schema({
    email: String,
    hash: String,
    name: String
})

var User = mongoose.model('User', userSchema)

module.exports = User