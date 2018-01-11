'use strict'

const settings = require('../settings')

const express = require('express')
const passport = require('passport')
const passportRefresh = require('passport-oauth2-refresh')
const OAuth2Strategy = require('passport-oauth2')

const router = express.Router()

function refreshRequest () {
  console.log('AVS token refresh request..')
  passportRefresh.requestNewAccessToken('oauth2', settings.data.avs.refresh,
    (err, accessToken, refreshToken) => {
      if (err) {
        console.log(err)
      } else {
        console.log('AVS token refresh success')
        settings.data.avs.token = accessToken
        settings.data.avs.refresh = refreshToken
      }
    })
}

const strategy = new OAuth2Strategy({
  authorizationURL: 'https://www.amazon.com/ap/oa',
  tokenURL: 'https://api.amazon.com/auth/o2/token',
  clientID: settings.config.avs.client_id,
  clientSecret: settings.config.avs.client_secret,
  callbackURL: settings.config.avs.redirect_url,
  scope: 'alexa:all'
},
  (accessToken, refreshToken, profile, done) => {
    console.log('profile = ', profile)
    settings.data.avs.token = accessToken
    settings.data.avs.refresh = refreshToken
    setInterval(refreshRequest, 30 * 60 * 1000)
    return done(null, profile)
  }
)

strategy.authorizationParams = function (options) {
  return {
    scope_data: JSON.stringify({
      'alexa:all': {
        'productID': settings.config.avs.device_type_id,
        'productInstanceAttributes': {
          'deviceSerialNumber': '123'
        }
      }
    })
  }
}

passport.use(strategy)
passportRefresh.use(strategy)

router.get('/login', passport.authenticate('oauth2'))
router.get('/callback',
  passport.authenticate('oauth2', { session: false }),
  (req, res) => {
    console.dir('after authresponse: ', res)
    res.redirect('/')
  })

router.get('/refresh', (req, res) => {
  passportRefresh.requestNewAccessToken('oauth2', settings.data.avs.refresh,
    (err, accessToken, refreshToken) => {
      if (err) {
        console.log(err)
      } else {
        settings.data.avs.token = accessToken
        settings.data.avs.refresh = refreshToken
      }

      res.redirect('/')
    })
})

router.post('/info', (req, res) => {
  console.log(req.body)
  settings.config.avs.client_id = req.body.client_id
  settings.config.avs.client_secret = req.body.client_secret
  settings.config.avs.device_type_id = req.body.device_type_id
  settings.Save()
  res.redirect('/setup')
})

module.exports = router
