import 'dotenv/config'
import * as postgres from 'postgres';
import { createOFFClient } from '#root/utils/createOFFClient';
import { PRODUCT_ERROR, NO_ID_MESSAGE } from '#root/consts/index';

/**
 * Add a .env file to your project directory and add your Neon connection string to it.
 * You can find the connection string for your database in the Connection Details widget
 * on the Neon Dashboard. For more information, see Connect from any application.
 * @see https://neon.tech/docs/guides/node#store-your-neon-credentials
*/
const { NEAON_DATABASE_URL } = process.env;
const sql = postgres.default(NEAON_DATABASE_URL, { ssl: 'require' });

export async function getProductByEAN(req, res) {
  try {
    let products;
    const { params: { id } } = req

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
    return res.send(PRODUCT_ERROR)
  }
}
