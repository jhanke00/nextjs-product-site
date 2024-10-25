import { waitUntil } from '@vercel/functions';
import { db } from '@/infra/db';
import products from '@/src/mock/large/products.json';
import { NewProduct } from '@/src/type/products';
import { ProductRepository } from '@/src/utils/products/repository';

const parsedProducts: Array<NewProduct> = products.map((product) => ({
  name: product.name,
  price: +product.price,
  description: product.description,
  category: product.category,
  countInStock: product.countInStock,
  rating: Math.round(product.rating),
  numReviews: product.numReviews,
}));

const productRepository = ProductRepository({ db });

/**
 * This is a helper to populate the development database.
 * To use it, navigate to http://localhost:3000/api/dev-support/populate-database running the app locally.
 */
export function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return new Response('Not allowed', { status: 403 });
  }

  waitUntil(
    (async () => {
      const count = await productRepository.countAll();

      if (count >= parsedProducts.length) {
        return console.log('Products already populated');
      }

      await productRepository.insertMany(parsedProducts);
      console.log(`Inserted ${parsedProducts.length} products`);
    })()
  );

  return new Response('Populating database. Check logs...', { status: 200 });
}
