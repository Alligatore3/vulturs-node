import 'dotenv/config'
import * as postgres from 'postgres';

export function instantiatePostgresNeonDB() {
  /**
   * Add a .env file to your project directory and add your Neon connection string to it.
   * You can find the connection string for your database in the Connection Details widget
   * on the Neon Dashboard. For more information, see Connect from any application.
   * @see https://neon.tech/docs/guides/node#store-your-neon-credentials
  */
  const { NEON_DATABASE_URL } = process.env;
  return postgres.default(NEON_DATABASE_URL, { ssl: 'require' });
}