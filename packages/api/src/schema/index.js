const _ = require('lodash')
const { makeExecutableSchema } = require('apollo-server-lambda')
const restaurant = require('./restaurant')

const base = `
type Query
`

module.exports = makeExecutableSchema({
  typeDefs: [base, restaurant.typeDef],
  resolvers: _.merge(restaurant.resolvers)
})
