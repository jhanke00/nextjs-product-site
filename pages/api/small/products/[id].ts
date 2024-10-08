import type { NextApiRequest, NextApiResponse } from 'next';
import products from '@/src/mock/small/products.json';
import response from '@/src/utils/response';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      const product = products.find(
        (product) =>
          product.id === id && {
            ...product,
            price: Number(product.price),
          }
      );

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json(product);
    default:
      response.methodNotAllowed(res, req.method as string, ['GET']);
  }
}
