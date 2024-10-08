import type { NextApiRequest, NextApiResponse } from 'next';
import products from '@/src/mock/small/products.json';
import { IProduct } from '@/src/types/products';
import response from '@/src/utils/response';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Convert price from string to number
      const convertedProducts: IProduct[] = products.map((product) => ({
        ...product,
        _id: product.id,
        price: Number(product.price),
      }));

      const minPrice = Math.min(...convertedProducts.map((product) => product.price));
      const maxPrice = Math.max(...convertedProducts.map((product) => product.price));

      const categories = Array.from(new Set(convertedProducts.map((product: IProduct) => product.category)));
      categories.sort((a, b) => a.localeCompare(b));

      res.status(200).json({
        prices: { min: minPrice, max: maxPrice },
        ratings: { min: 0, max: 5 },
        categories,
      });
    default:
      response.methodNotAllowed(res, req.method as string, ['GET']);
  }
}
