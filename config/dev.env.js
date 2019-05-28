'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DMF_API_BASE_URL: '"http://192.64.116.204:9090/api"'
})
