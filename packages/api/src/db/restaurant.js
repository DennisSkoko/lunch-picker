const _ = require('lodash/fp')
const database = require('../database')
const util = require('../util')

const { RESTAURANT_TABLE } = process.env

module.exports = {
  all () {
    return database
      .scan({ TableName: RESTAURANT_TABLE })
      .promise()
      .then(_.get('Items'))
      .then(_.map(util.toCamelCase))
  },

  get (name) {
    return database
      .get({
        TableName: RESTAURANT_TABLE,
        Key: { Name: name }
      })
      .promise()
      .then(_.get('Item'))
      .then(res => res ? util.toCamelCase(res) : null)
  },

  put (restaurant) {
    return database
      .put({
        TableName: RESTAURANT_TABLE,
        Item: util.toPascalCase(restaurant),
        ReturnValues: 'NONE',
        ReturnConsumedCapacity: 'NONE',
        ReturnItemCollectionMetrics: 'NONE'
      })
      .promise()
      .then(() => null)
  }
}
