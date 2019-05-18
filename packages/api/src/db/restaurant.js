const database = require('../database')

const { RESTAURANT_TABLE } = process.env

module.exports = {
  async all () {
    const res = await database
      .scan({ TableName: RESTAURANT_TABLE })
      .promise()

    return res.Items.map(item => ({ name: item.Name }))
  },

  async get (name) {
    const res = await database
      .get({
        TableName: RESTAURANT_TABLE,
        Key: { Name: name }
      })
      .promise()

    return { name: res.Item.Name }
  }
}
