import type { NextApiRequest, NextApiResponse } from 'next';
import users from '@/src/mock/small/users.json';
import response from '@/src/utils/response';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      const user = users.find((user) => user.id === id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    default:
      response.methodNotAllowed(res, req.method as string, ['GET']);
  }
}
