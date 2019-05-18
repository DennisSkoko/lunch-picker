import { ApolloServer } from 'apollo-server-lambda'
import schema from './schema'

const graphql = new ApolloServer({ schema });

export default graphql;
