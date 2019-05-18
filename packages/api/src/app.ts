import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.json({ message: 'Whoop whoop!' })
})

export default app
