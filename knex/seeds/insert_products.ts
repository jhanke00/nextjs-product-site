import { writeFileSync } from 'fs';
import { Knex } from 'knex';
import smallProductData from '../../src/mock/small/products.json';
import largeProductData from '../../src/mock/large/products.json';
import { UlidMonotonic } from 'id128';

const createProductIdMap = (products: typeof smallProductData) => {
  const uidToUlidMap: Record<string, string> = {};
  products.forEach((product) => {
    uidToUlidMap[product.id] = UlidMonotonic.generate().toCanonical();
  });

  writeFileSync('knex/seeds/products_id_map.json', JSON.stringify(uidToUlidMap, null, 2));

  return uidToUlidMap;
};

export async function seed(knex: Knex): Promise<void> {
  const data = [...largeProductData, ...smallProductData];
  const idMap = createProductIdMap(data);

  await knex('products').del();
  await knex.batchInsert(
    'products',
    data.map((product) => ({
      productId: idMap[product.id],
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      rating: product.rating,
      numReviews: product.numReviews,
      countInStock: product.countInStock,
    }))
  );
}
