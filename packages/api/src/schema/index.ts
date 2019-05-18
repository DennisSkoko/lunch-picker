import { makeExecutableSchema } from 'apollo-server-lambda'
import merge from 'lodash.merge'
import * as resturants from './restaurants'

const base = `
type Query
`

export default makeExecutableSchema({
  typeDefs: [base, resturants.typeDef],
  resolvers: merge(resturants.resolvers)
})
