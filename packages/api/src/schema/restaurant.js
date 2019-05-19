const db = require('../db')

const typeDef = `
type Restaurant {
  name: String!
}

input RestaurantInput {
  name: String!
}

extend type Query {
  restaurants: [Restaurant!]!
  restaurant(name: String!): Restaurant
}

extend type Mutation {
  putRestaurant(restaurant: RestaurantInput!): Restaurant!
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
  },

  Mutation: {
    putRestaurant (_, { restaurant }) {
      return db.restaurant
        .put(restaurant)
        .then(() => restaurant)
    }
  }
}

module.exports = { typeDef, resolvers }
