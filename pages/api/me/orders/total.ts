import type { NextApiResponse } from 'next';
import { CustomNextApiUserRequest } from '@/src/type/customUserRequest';
import Order from '@/models/Order';
import dbConnect from '@/src/utils/dbConnect';
import authMiddleware from '@/src/utils/middlewares/authMiddleware';

async function handler(req: CustomNextApiUserRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const result = await Order.aggregate([
          {
            $match: { user: req.userId },
          },
          {
            $group: {
              _id: null,
              totalSpent: { $sum: '$total' },
            },
          },
        ]);

        const totalSpent = result.length > 0 ? result[0].totalSpent : 0;

        res.status(200).json({ totalSpent });
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
