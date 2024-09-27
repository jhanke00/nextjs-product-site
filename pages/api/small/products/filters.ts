import type { NextApiRequest, NextApiResponse } from 'next';
import products from '@/src/mock/small/products.json';
import { Product } from '@/src/type/products';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Convert price from string to number
      const convertedProducts: Product[] = products.map((product) => ({
        ...product,
        price: Number(product.price),
      }));

      const minPrice = Math.min(...convertedProducts.map((product) => product.price));
      const maxPrice = Math.max(...convertedProducts.map((product) => product.price));

      const categories = Array.from(new Set(convertedProducts.map((product: Product) => product.category)));
      categories.sort((a, b) => a.localeCompare(b));

      res.status(200).json({
        prices: { min: minPrice, max: maxPrice },
        ratings: { min: 1, max: 5 },
        categories,
      });
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
