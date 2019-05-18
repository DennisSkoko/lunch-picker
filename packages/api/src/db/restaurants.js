const db = [
  { name: 'Namdu' },
  { name: 'Surf Shack' },
  { name: 'Zocalo' }
]

module.exports = {
  all () {
    return db
  },

  get (name) {
    return db.find(restaurant => restaurant.name === name)
  }
}
