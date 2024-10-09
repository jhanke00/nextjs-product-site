// Libs
import { NextApiResponse } from 'next';
import Exception from './exception';

const errorHandler = (error: Exception | Error | unknown, res: NextApiResponse) => {
  return res
    .status(error instanceof Exception ? error.status : 500)
    .send({ message: error instanceof Exception ? error.message : 'Internal error' });
};

export default errorHandler;
