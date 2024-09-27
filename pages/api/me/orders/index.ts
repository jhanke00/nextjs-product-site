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
      const { order = 'asc', sort = 'time', page = 1, limit = 10 } = req.query;

      const query: any = { user: req.userId };

      try {
        const orders = await Order.find(query)
          .sort({ [sort as string]: order === 'asc' ? 1 : -1 })
          .skip((Number(page) - 1) * Number(limit))
          .limit(Number(limit))
          .select('-user');

        const totalCount = await Order.countDocuments(query);

        res.status(200).json({
          orders,
          totalCount,
          totalPages: Math.ceil(totalCount / Number(limit)),
          currentPage: Number(page),
        });
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
