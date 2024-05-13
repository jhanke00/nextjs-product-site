import { NextApiRequest, NextApiResponse } from 'next';
import { getKnex } from '@/knex';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { productId } = req.query;

  if (!productId) {
    return res.status(400).json({ message: 'productId is missing' });
  }

  const knex = getKnex();
  const data = await knex
    .select('productId', 'name', 'price', 'description', 'category', 'rating', 'numReviews', 'countInStock')
    .from('products')
    .where({ productId })
    .first();

  if (!data) {
    return res.status(404).json({ message: 'Unable to find product' });
  }

  return res.status(200).json(data);
}
