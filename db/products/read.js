import 'dotenv/config'
import { createNeonProduct } from '#root/db/products/create';
import { createOFFClient } from '#root/utils/createOFFClient';
import { exctractOFFValuesAndConvert } from '#root/utils/exctractOFFValuesAndConvert';
import { PRODUCT_ERROR, NO_ID_MESSAGE } from '#root/consts/index';
import { instantiatePostgresNeonDB } from '#root/utils/instantiatePostgresNeonDB';

async function fetchOFFProductAndStoreToNeon(ean) {
  const client = createOFFClient()
  const product = await client.getProduct(ean)

  const elaboratedProduct = exctractOFFValuesAndConvert(product)

  await createNeonProduct(elaboratedProduct)

  return elaboratedProduct
}

export async function getProductByEAN(req, res) {
  try {
    let product;
    const { params: { id } } = req

    if (!id) return res.send(NO_ID_MESSAGE)

    const ean = parseInt(id, 10)

    if (isNaN(ean)) {
      return res.send(NO_ID_MESSAGE)
    }

    const sql = instantiatePostgresNeonDB();

    /**
     * All queries will return a Result array,
     * with objects mapping column names to each row.
     * @see https://github.com/porsager/postgres#queries
     */
    const products = await sql`
      select *
      from products
      where product_ean = ${ean}
    `;

    if (!products || !products.length) {
      product = await fetchOFFProductAndStoreToNeon(ean)
    } else {
      product = products[0]
    }

    res.send(product)
    return;
  } catch (error) {
    return res.send(PRODUCT_ERROR)
  }
}
