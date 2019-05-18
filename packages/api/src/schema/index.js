const { makeExecutableSchema } = require('apollo-server-lambda')
const merge = require('lodash.merge')
const restaurants = require('./restaurants')

const base = `
type Query
`

module.exports = makeExecutableSchema({
  typeDefs: [base, restaurants.typeDef],
  resolvers: merge(restaurants.resolvers)
})
