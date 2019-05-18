const db = require('../db')

const typeDef = `
type Restaurant {
  name: String!
}

extend type Query {
  restaurants: [Restaurant!]!
  restaurant(name: String!): Restaurant
}
`

const resolvers = {
  Query: {
    restaurants () {
      return db.restaurant.all()
    },

    restaurant (_, { name }) {
      return db.restaurant.get(name)
    }
  }
}

module.exports = { typeDef, resolvers }
