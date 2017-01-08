var express = require('express')
var router = express.Router()
var User = require('../../models/user')
var bcrypt = require('bcrypt-nodejs')
var debug = require('debug')('library:users')

router.get('/', global.requiredAdmin, function (req, res) {
  User.find().exec(function (err, rows) {
    res.render('pages/users/index', {rows: rows})
  })
})

router.get('/signup', function (req, res) {
  res.render('pages/users/signup')
})

router.post('/signup', function (req, res) {
  User.findOne({email: req.body.email}).exec(function (e, doc) {
    if (doc != null) {
      req.flash('error', 'User with this email already registered')
      res.redirect('/signup')
    } else {
      bcrypt.hash(req.body.password, null, null, function (err, hash) {
        var newUser = new User({
          email: req.body.email,
          hash: hash,
          last_name: req.body.last_name,
          first_name: req.body.first_name,
          is_admin: false
        })

        newUser.save((err, product) => {
          if (err) {
            debug(err)
          } else {
            debug(product)
          }

          req.flash('info', 'Signup succesful')
          res.redirect('/')
        })
      })
    }
  })
})

router.get('/signin', function (req, res) {
  res.render('pages/users/signin')
})

router.post('/signin', function (req, res) {
  User.findOne({email: req.body.email}).exec(function (e, doc) {
    if (doc == null) {
      req.flash('error', 'This email is not registered')
      res.redirect('/users/signin')
    } else {
      bcrypt.compare(req.body.password, doc.hash, function (err, isOK) {
        if (!isOK) {
          req.flash('error', 'Wrong password')
          res.redirect('/users/signin')
        } else {
          debug(doc)
          debug(doc.getName())
          req.session.user = doc
          req.flash('success', 'Sign in succesful')
          res.redirect('/')
        }
      })
    }
  })
})

module.exports = router

