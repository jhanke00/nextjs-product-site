import type { NextApiResponse } from 'next';
import { CustomNextApiUserRequest } from '@/src/type/customUserRequest';
import User from '@/models/User';
import dbConnect from '@/src/utils/dbConnect';
import authMiddleware from '@/src/utils/middlewares/authMiddleware';

async function handler(req: CustomNextApiUserRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const user = await User.findById(req.userId).select('-password -__v');

        res.status(200).json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error. Please try again.' });
      }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default authMiddleware(handler);
