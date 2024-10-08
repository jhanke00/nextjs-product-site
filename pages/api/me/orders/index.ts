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
        response.error(res, error as Error);
      }

    default:
      response.methodNotAllowed(res, req.method as string, ['GET']);
  }
}

export default authMiddleware(handler);
