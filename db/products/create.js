import 'dotenv/config'
import { PRODUCT_ERROR } from '#root/consts/index';
import { instantiatePostgresNeonDB } from '#root/utils/instantiatePostgresNeonDB';

export async function createNeonProduct(product) {
  try {
    const sql = instantiatePostgresNeonDB();

    // You can omit column names and simply execute sql(user)
    // to get all the fields from the object as columns.
    await sql`
      insert into products ${sql(product)}
    `
    return product;
  } catch (error) {
    return res.send(PRODUCT_ERROR)
  }
}
