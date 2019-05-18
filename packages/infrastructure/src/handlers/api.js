'use strict'

const serverless = require('serverless-http')
const app = require('lunch-picker-api').default

exports.handler = serverless(app)
