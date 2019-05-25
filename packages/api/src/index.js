'use strict'

const graphql = require('./graphql')

module.exports = graphql.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
})
