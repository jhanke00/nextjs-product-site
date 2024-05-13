import { NextApiRequest, NextApiResponse } from 'next';
import { getKnex } from '@/knex';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'userId is missing' });
  }

  const knex = getKnex();
  const data = await knex
    .select(
      'o.orderId',
      knex.raw(
        "array_agg(json_object('productId': p.\"productId\", 'name': p.name, 'price': p.price, 'count': op.count)) as items"
      ),
      'o.total',
      'o.time'
    )
    .from('orders as o')
    .leftJoin('order_products as op', 'op.orderId', 'o.orderId')
    .leftJoin('products as p', 'p.productId', 'op.productId')
    .where({ userId })
    .groupBy('o.orderId')
    .orderBy('o.time', 'asc');

  return res.status(200).json(data);
}
