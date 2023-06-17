
const getProductByEAN = require('./db/products/read.js')
const getAll = require('./utils/postgresTest.js')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 8899

// @see https://expressjs.com/en/resources/middleware/cors.html
app.use(cors())

app.get('/product/:id', getProductByEAN)
app.get('/neon/all', getAll)

app.listen(port, () => console.log(`Example app listening on port ${port}`))