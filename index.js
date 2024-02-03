// @see https://stackoverflow.com/a/70161021/3301249
import { deleteProductByEAN } from '#root/db/products/delete'
import { getProductByEAN } from '#root/db/products/read'
import express from 'express'
import cors from 'cors'

const app = express()
const port = 8899

// @see https://expressjs.com/en/resources/middleware/cors.html
app.use(cors())

app.get('/product/:id', getProductByEAN)

app.delete('/product/:id', deleteProductByEAN)

app.listen(port, () => console.log(`Example app listening on port ${port}`))