var express = require('express')
var debug = require('debug')('library:server')
var http = require('http')
const session = require('express-session')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var flash = require('connect-flash')
var helmet = require('helmet')
var models = require('./models')

global.requiredUser = requiredUser
global.requiredAdmin = requiredAdmin

var app = express()

app.use(helmet())

setAppLocals()
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({secret: 'cats', resave: false, saveUninitialized: false}))
app.use(flash())
// app.set('trust proxy', 1) // trust first proxy
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))

app.use(flashMiddleware)

var routes = require('./routes')


app.use('/', routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('pages/error')
})

// setAppLocals()


function flashMiddleware (req, res, next) {
  // console.log(req.session.user);

  res.locals.user = req.session.user
  res.locals.helpers = app.locals.helpers
  
  // if (res.locals.user)
  //   res.locals.user_name = res.locals.user.getName()
  res.locals.error = req.flash('error')
  res.locals.info = req.flash('info')
  res.locals.success = req.flash('success')
  res.locals.query = ''

  if (!res.locals.error) {
    delete res.locals.error
  }
  if (!res.locals.info) { delete res.locals.info }
  if (!res.locals.success) {
    delete res.locals.success
  }
  // delete req.session.error;
  // delete req.session.info;
  // delete req.session.success;

  // console.log(res.locals.info);
  next()
}

function requiredUser (req, res, next) {
  if (req.session.user) {
    next()
  } else {
    req.flash('info', 'You need to sign in first.')
    res.redirect('/users/signin')
  }
}

function requiredAdmin (req, res, next) {
  if (req.session.user && req.session.user.is_admin) {
    next()
  } else {
    req.flash('error', 'You do not have the required priviliges to access this page.')
    res.redirect('/')
  }
}

function setAppLocals () {

  function getBookUrl(id) {
    return '/books/' + id
  }

  function getAuthorUrl(id) {
    return '/authors/' + id
  }

  function getCommentUrl(id) {
    return '/comments/' + id
  }

  function getAuthorLink(author) {
    return "<a href='" + getAuthorUrl(author._id) + "'>" + author.name + "</a>"
  }

  function getBookLink(book) {
    return "<a href='" + getBookUrl(book._id) + "'>" + book.name + "</a>"
  }

  function getAuthorEditUrl(id) {
    return '/authors/' + id + '/edit'
  }

  function getBookEditUrl(id) {
    return '/books/' + id + '/edit'
  }

  app.locals.helpers = {
    getBookUrl,
    getAuthorUrl,
    getCommentUrl,
    getAuthorLink,
    getBookLink,
    getAuthorEditUrl,
    getBookEditUrl
  }
  // debug(app.locals.helpers)
}

module.exports = app