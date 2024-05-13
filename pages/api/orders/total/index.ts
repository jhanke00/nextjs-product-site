import { NextApiRequest, NextApiResponse } from 'next';
import { getKnex } from '@/knex';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'userId is missing' });
  }

  const knex = getKnex();
  const total = await knex('orders').select(knex.raw('coalesce(sum(total), 0) as total')).where({ userId }).first();

  return res.status(200).json(total);
}
