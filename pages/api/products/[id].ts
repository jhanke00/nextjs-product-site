// Libs
import { NextApiRequest, NextApiResponse } from 'next';
import { use } from 'next-api-route-middleware';
import { errorHandler } from '../../../lib/errorHandler';

// Middlewares
import allowedMethodsValidator from '../../../middlewares/allowedMethodsValidator';

// Services
import ProductsService from '../../../services/products.service';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string;
    const product = await ProductsService.getById(id);
    return res.status(200).json(product);
  } catch (error) {
    return errorHandler(error, res);
  }
};

export default use(allowedMethodsValidator(['GET']), handler);
