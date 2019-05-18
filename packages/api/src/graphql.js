const { ApolloServer } = require('apollo-server-lambda')
const schema = require('./schema')

const isProd = process.env.NODE_ENV === 'production'

const graphql = new ApolloServer({
  schema,
  tracing: !isProd,
  playground: !isProd
})

module.exports = graphql
