'use strict'

const settings = require('./settings')

const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(passport.initialize())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/avs', require('./routes/avs.js'))

app.post('/info', (req, res) => {
  console.log(req.body)
  settings.config.option.scenario_mode = parseInt(req.body.mode)
  settings.Save()
  res.redirect('/setup')
})

app.get('/', function (req, res, next) {
  res.render('index', {
    settings: settings,
    active_menu: '/'
  })
})

app.get('/setup', function (req, res, next) {
  res.render('setup', {
    settings: settings,
    active_menu: '/setup'
  })
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
