import { NextApiRequest, NextApiResponse } from 'next';
import { getKnex } from '@/knex';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = +(req.query.page ?? 1);
  const size = +(req.query.size ?? 20);
  const search = String(req.query.search || '');

  const knex = getKnex();
  const query = knex
    .select('userId', 'firstName', 'lastName', 'email', 'phoneNumber')
    .from('users')
    .orderBy([
      { column: 'firstName', order: 'asc' },
      { column: 'lastName', order: 'asc' },
    ]);
  if (search) {
    query
      .clearOrder()
      .fromRaw(knex.raw('users, word_similarity(?, search) as score', search))
      .whereRaw('? <% search', [search])
      .orderBy([
        { column: 'score', order: 'desc' },
        { column: 'firstName', order: 'asc' },
        { column: 'lastName', order: 'asc' },
      ]);
  }
  const countQuery = knex.count('* as total').from(query.clone().offset(0)).first();

  const data = await knex.transaction(async (trx) => {
    const results = await query
      .transacting(trx)
      .limit(size)
      .offset(size * (page - 1));

    const countResult = await countQuery.transacting(trx);
    const total = +(countResult.total || 0);
    const pageData = {
      page,
      size,
      totalPages: Math.ceil(total / size),
    };

    return { data: results, pageData };
  });

  return res.status(200).json(data);
}
