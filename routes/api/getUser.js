var User = require('../../models/user')

module.exports = function(req, res) {
  var user_id = req.params.user_id

  User.findById(user_id, "last_name first_name _id").exec(function(err, result) {
    res.send(result)
  })
}