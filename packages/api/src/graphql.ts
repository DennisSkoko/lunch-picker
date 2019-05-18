import { ApolloServer } from 'apollo-server-lambda'
import schema from './schema'

const isProd = process.env.NODE_ENV === 'production'

const graphql = new ApolloServer({
  schema,
  tracing: !isProd,
  playground: !isProd
})

export default graphql
