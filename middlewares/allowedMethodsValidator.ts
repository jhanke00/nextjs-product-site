// Libs
import { Middleware } from 'next-api-route-middleware';
import { ErrorCode } from '@/lib/errorHandler';

const allowedMethodsValidator = (allowedMethods: string[]): Middleware => {
  return async function (req, res, next) {
    if (!allowedMethods.includes(req.method!)) {
      res.status(ErrorCode.MethodNotAllowed).send({ message: 'Method not allowed.' });
    }

    await next();
  };
};

export default allowedMethodsValidator;
