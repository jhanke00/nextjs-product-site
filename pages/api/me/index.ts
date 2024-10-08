import type { NextApiResponse } from 'next';
import { CustomNextApiRequest } from '@/src/types/next';
import User from '@/src/models/User';
import dbConnect from '@/src/utils/dbConnect';
import authMiddleware from '@/src/utils/middlewares/auth';
import response from '@/src/utils/response';

async function handler(req: CustomNextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const user = await User.findById(req.userId).select('-password -__v');

        res.status(200).json(user);
      } catch (error) {
        response.error(res, error as Error);
      }

    default:
      response.methodNotAllowed(res, req.method as string, ['GET']);
  }
}

export default authMiddleware(handler);
