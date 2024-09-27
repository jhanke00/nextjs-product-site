import type { NextApiRequest, NextApiResponse } from 'next';
import orders from '@/src/mock/small/orders.json';
import users from '@/src/mock/small/users.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      const user = users.find((user) => user.id === id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const totalSpent = orders.filter((order) => order.user === id).reduce((acc, order) => acc + order.total, 0);

      res.status(200).json({ totalSpent });
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
