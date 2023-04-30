const createOFFClient = require('./createOFFClient.js')
const CONSTS = require('../consts/index.js')

async function getProductByEAN(req, res) {
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
}

module.exports = getProductByEAN