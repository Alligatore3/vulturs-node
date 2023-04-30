const createOFFClient = require('./utils/createOFFClient.js')
const no_id_message = 'EAN is missing or not valid.'
const express = require('express')
const cors = require('cors')
const app = express()
const port = 8899

// @see https://expressjs.com/en/resources/middleware/cors.html
app.use(cors())

app.get('/product/:id', async (req, res) => {
  const { params: { id } } = req

  if (!id) return res.send(no_id_message)

  const ean = parseInt(id, 10)
  if (isNaN(ean)) return res.send(no_id_message)

  const client = createOFFClient()
  const product = await client.getProduct(ean)

  res.send(product)
  return;
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))