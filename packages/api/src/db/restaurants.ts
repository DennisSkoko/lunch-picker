const db = [
  { name: 'Namdu' },
  { name: 'Surf Shack' },
  { name: 'Zocalo' }
]

export default {
  all () {
    return db
  },

  get (name: string) {
    return db.find(restaurant => restaurant.name === name)
  }
}
