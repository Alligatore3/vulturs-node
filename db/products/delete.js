import 'dotenv/config'
import { NO_ID_MESSAGE } from '#root/consts/index';
import { instantiatePostgresNeonDB } from '#root/utils/instantiatePostgresNeonDB';

export async function deleteProductByEAN(req, res) {
  try {
    const { params: { id } } = req

    if (!id) return res.send(NO_ID_MESSAGE)

    const sql = instantiatePostgresNeonDB();

    /**
     * All queries will return a Result array,
     * with objects mapping column names to each row.
     * @see https://github.com/porsager/postgres#queries
     */
    const response = await sql`delete from products where product_ean = ${id}`;

    res.send(response)
    return;
  } catch (error) {
    return res.send(`deleteProductByEAN:: error while deleting product: ${id}`)
  }
}