import { PRODUCT_EAN, PRODUCT_NAME, PRODUCT_IMAGE } from '#root/consts/columns/products';

export function exctractOFFValuesAndConvert({ product }) {
  const { product_name, image_front_url, id, category_properties } = product

  return {
    [PRODUCT_IMAGE]: image_front_url,
    [PRODUCT_NAME]: product_name,
    [PRODUCT_EAN]: id,
  }
}