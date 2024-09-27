import type { NextApiRequest, NextApiResponse } from 'next';
import Product from '@/models/Product';
import dbConnect from '@/src/utils/dbConnect';

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
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error. Please try again.' });
      }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
