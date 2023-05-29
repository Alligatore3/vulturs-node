const postgres = require('postgres');
require('dotenv').config();

const { NEAON_DATABASE_URL } = process.env;

const sql = postgres(NEAON_DATABASE_URL, { ssl: 'require' });


/**
 * Add a .env file to your project directory and add your Neon connection string to it.
 * You can find the connection string for your database in the Connection Details widget
 * on the Neon Dashboard. For more information, see Connect from any application.
 * @see https://neon.tech/docs/guides/node#store-your-neon-credentials
 */
async function getAll() {
  const result = await sql`
    select *
    from Vulturs
  `;
  console.log(result);
}

getAll();