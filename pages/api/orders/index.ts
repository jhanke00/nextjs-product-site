import { NextApiRequest, NextApiResponse } from 'next';
import { getKnex } from '@/knex';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'userId is missing' });
  }

  const knex = getKnex();
  const data = await knex
    .with('order_details', (qb) => {
      qb.select('op.orderId', 'p.productId', 'p.name', knex.raw('??::text', 'p.price'), 'op.count')
        .from('order_products as op')
        .leftJoin('products as p', 'p.productId', 'op.productId');
    })
    .select('o.orderId', knex.raw("jsonb_agg(to_jsonb(od) - 'orderId') as items"), 'o.total', 'o.time')
    .fromRaw(knex.raw('orders as o, order_details od'))
    .where('o.orderId', '=', knex.ref('od.orderId'))
    .andWhere({ userId })
    .groupBy('o.orderId')
    .orderBy('o.time', 'asc');

  return res.status(200).json(data);
}
