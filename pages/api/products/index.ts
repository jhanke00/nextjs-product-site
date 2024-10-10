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
    const allProducts = await ProductsService.getAll();
    return res.status(200).json({ products: allProducts });
  } catch (error) {
    return errorHandler(error, res);
  }
};

export default use(allowedMethodsValidator(['GET']), handler);
