const createOFFClient = require('./utils/createOFFClient.js')
const CONSTS = require('./consts/index.js')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 8899

// @see https://expressjs.com/en/resources/middleware/cors.html
app.use(cors())

app.get('/product/:id', async (req, res) => {
  try {
    const { params: { id } } = req

    if (!id) return res.send(no_id_message)

    const ean = parseInt(id, 10)

    if (isNaN(ean)) {
      const { NO_ID_MESSAGE } = CONSTS
      return res.send(NO_ID_MESSAGE)
    }

    const client = createOFFClient()
    const product = await client.getProduct(ean)

    res.send(product)
    return;
  } catch (error) {
    const { PRODUCT_ERROR } = CONSTS
    return res.send(PRODUCT_ERROR)
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))