import { IResolvers } from 'apollo-server-lambda'
import db from '../db'

const typeDef = `
type Restaurant {
  name: String!
}

extend type Query {
  restaurants: [Restaurant!]!
  restaurant(name: String!): Restaurant
}
`;

const resolvers: IResolvers = {
  Query: {
    restaurants () {
      return db.restaurant.all()
    },

    restaurant (_, { name }) {
      return db.restaurant.get(name)
    }
  }
}

export { typeDef, resolvers }
