import { NextApiRequest, NextApiResponse } from 'next';
import { getKnex } from '@/knex';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { productId } = req.query;

  const knex = getKnex();
  const query = knex
    .select('productId', 'name', 'price', 'description', 'category', 'rating', 'numReviews', 'countInStock')
    .from('products')
    .where({ productId })
    .first();

  const data = await query;

  return res.status(200).json(data);
}
