var models = require('../../models')

module.exports = function (req, res) {
  models.search({ query: req.query.q }, function (err, results) {
    if (err) {
      debug(err)
      res.status(403).send("Bad request")
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(results)
    }
  }
  )
}