import type { NextApiRequest, NextApiResponse } from 'next';
import Product from '@/src/models/Product';
import dbConnect from '@/src/utils/dbConnect';
import response from '@/src/utils/response';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  // Check the method in case we want to add a POST route as well to include products
  switch (method) {
    case 'GET':
      try {
        const product = await Product.findById(id);

        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
      } catch (error) {
        response.error(res, error as Error);
      }
    default:
      response.methodNotAllowed(res, req.method as string, ['GET']);
  }
}
