'use strict'

const path = require('path')
const fs = require('fs')

const settings = {
  config: require('./config.json'),
  data: {
    avs: {
      token: 'none',
      refresh: 'none'
    },
    akc: {
      usertoken: 'none',
      userid: 'none'
    },
  },
  Save: function () {
    try {
      fs.writeFileSync('./config.json', JSON.stringify(settings.config, null, 2))
    } catch (e) {
      console.error(e)
    }
  },
  reboot: function () {
  }
}

settings.config.avs.client_id = process.env.CLIENT_ID || settings.config.avs.client_id
settings.config.avs.client_secret = process.env.CLIENT_SECRET || settings.config.avs.client_secret
settings.config.avs.device_type_id = process.env.PRODUCT_ID || settings.config.avs.device_type_id

module.exports = settings
