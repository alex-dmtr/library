var Author = require('../../models/author')
var debug = require('debug')('library:api')

module.exports = function(req, res) {

  debug('hello world')

  Author.findById(req.params.author_id).exec(function(err, author) {
    // res.setHeaderType('Content-Type', 'application/json')
     
    
    if (err)
      res.send(err)
    else
      res.send(author)
  })
}