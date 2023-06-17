require('dotenv').config();
const postgres = require('postgres');
const CONSTS = require('../../consts/index.js')
const createOFFClient = require('../../utils/createOFFClient.js')

const { NEAON_DATABASE_URL } = process.env;
const sql = postgres(NEAON_DATABASE_URL, { ssl: 'require' });

async function getProductByEAN(req, res) {
  try {
    let products;
    const { params: { id } } = req

    const { NO_ID_MESSAGE } = CONSTS
    if (!id) return res.send(NO_ID_MESSAGE)

    const ean = parseInt(id, 10)

    if (isNaN(ean)) {
      return res.send(NO_ID_MESSAGE)
    }

    /**
     * All queries will return a Result array,
     * with objects mapping column names to each row.
     * @see https://github.com/porsager/postgres#queries
     */
    products = await sql`
      select *
      from products
      where product_ean = ${ean}
    `;

    if (!products || !products.length) {
      // Fetch to OFF db and @todo CRUD to Neon
      const client = createOFFClient()
      products = await client.getProduct(ean)
    }


    res.send(products)
    return;
  } catch (error) {
    const { PRODUCT_ERROR } = CONSTS
    return res.send(PRODUCT_ERROR)
  }
}

module.exports = getProductByEAN