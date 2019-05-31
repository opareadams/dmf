'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DMF_API_BASE_URL: '"https://dmf-api.herokuapp.com/api"'
})
