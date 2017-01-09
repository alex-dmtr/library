var models = require('../../models'),
  Book = models.Book,
  Comment = models.Comment

module.exports = function(req, res) {
  Comment.find({book: req.params.book_id}).exec(function(err, result) {
    res.send(result)
  })
}