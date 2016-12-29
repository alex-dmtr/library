var mongoose = require('mongoose'),
  Schema = mongoose.Schema

var userSchema = Schema({
  email: String,
  hash: String,
  last_name: String,
  first_name: String,
  is_admin: Boolean
})

userSchema.methods.getName = function () {
  return this.last_name + ' ' + this.first_name
}

var User = mongoose.model('User', userSchema)

module.exports = User
