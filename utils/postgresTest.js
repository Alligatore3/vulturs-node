const CONSTS = require('../consts/index.js')
const postgres = require('postgres');
require('dotenv').config();

const { NEAON_DATABASE_URL } = process.env;
const { PRODUCT_ERROR, DBs_NAME } = CONSTS
const sql = postgres(NEAON_DATABASE_URL, { ssl: 'require' });


/**
 * Add a .env file to your project directory and add your Neon connection string to it.
 * You can find the connection string for your database in the Connection Details widget
 * on the Neon Dashboard. For more information, see Connect from any application.
 * @see https://neon.tech/docs/guides/node#store-your-neon-credentials
 */
async function getAll(req, res) {
  try {
    const m = DBs_NAME.PRODUCTS
    const allRecords = await sql`
      select *
      from ${m}
    `;

    res.send(allRecords)
    return;
  } catch (error) {
    const { PRODUCT_ERROR } = CONSTS
    return res.send(PRODUCT_ERROR)
  }
}

module.exports = getAll
