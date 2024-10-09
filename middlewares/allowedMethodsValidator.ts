// Libs
import { Middleware } from 'next-api-route-middleware';

const allowedMethodsValidator = (allowedMethods: string[]): Middleware => {
  return async function (req, res, next) {
    if (!allowedMethods.includes(req.method!)) {
      res.status(405).send({ message: 'Method not allowed.' });
    }

    await next();
  };
};

export default allowedMethodsValidator;
