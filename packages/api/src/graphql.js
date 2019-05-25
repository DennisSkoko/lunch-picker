const { ApolloServer } = require('apollo-server-lambda')
const schema = require('./schema')

const graphql = new ApolloServer({
  schema,
  playground: process.env.NODE_ENV === 'production'
})

module.exports = graphql
