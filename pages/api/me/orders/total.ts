import type { NextApiResponse } from 'next';
import { CustomNextApiRequest } from '@/src/types/next';
import Order from '@/src/models/Order';
import dbConnect from '@/src/utils/dbConnect';
import authMiddleware from '@/src/utils/middlewares/auth';
import response from '@/src/utils/response';

async function handler(req: CustomNextApiRequest, res: NextApiResponse) {
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
        response.error(res, error as Error);
      }

    default:
      response.methodNotAllowed(res, req.method as string, ['GET']);
  }
}

export default authMiddleware(handler);
