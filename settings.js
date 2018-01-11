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

module.exports = settings
