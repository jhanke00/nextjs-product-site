import { NextApiResponse } from 'next';
import { CustomNextApiRequest } from '@/src/types/next';
import jwt, { JwtPayload } from 'jsonwebtoken';
import response from '@/src/utils/response';

const auth = (handler: (req: CustomNextApiRequest, res: NextApiResponse) => Promise<void>) => {
  return async (req: CustomNextApiRequest, res: NextApiResponse) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(authorization, process.env.JWT_SECRET as string) as JwtPayload;

      req.userId = decoded.id;
      return handler(req, res);
    } catch (error) {
      response.error(res, error as Error);
    }
  };
};

export default auth;
