var models = require('../../models')

module.exports = function (req, res) {
  models.search({ query: req.query.q }, function (err, results) {
    if (err) {
      debug(err)
      req.flash('error', err)
      res.redirect('/')
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(results))
    }
  }
  )
}