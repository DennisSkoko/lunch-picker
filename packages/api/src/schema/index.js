const { makeExecutableSchema } = require('apollo-server-lambda')
const merge = require('lodash.merge')
const restaurant = require('./restaurant')

const base = `
type Query
`

module.exports = makeExecutableSchema({
  typeDefs: [base, restaurant.typeDef],
  resolvers: merge(restaurant.resolvers)
})
