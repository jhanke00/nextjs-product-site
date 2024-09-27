// middleware/auth.ts
import { NextApiResponse } from 'next';
import { CustomNextApiUserRequest } from '@/src/type/customUserRequest';
import jwt, { JwtPayload } from 'jsonwebtoken';

const authMiddleware = (handler: (req: CustomNextApiUserRequest, res: NextApiResponse) => Promise<void>) => {
  return async (req: CustomNextApiUserRequest, res: NextApiResponse) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(authorization, process.env.JWT_SECRET as string) as JwtPayload;

      req.userId = decoded.id;
      return handler(req, res);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: 'Access token expired', code: 'AccessTokenExpired' });
      } else if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: 'Access token invalid', code: 'AccessTokenInvalid' });
      } else {
        return res.status(500).json({ message: 'Internal Server Error. Please try again.' });
      }
    }
  };
};

export default authMiddleware;
