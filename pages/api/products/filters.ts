import type { NextApiRequest, NextApiResponse } from 'next';
import Product from '@/src/models/Product';
import dbConnect from '@/src/utils/dbConnect';
import response from '@/src/utils/response';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const prices = await Product.aggregate([
          {
            $group: {
              _id: null,
              minPrice: { $min: '$price' },
              maxPrice: { $max: '$price' },
            },
          },
          {
            $project: {
              _id: 0,
              min: { $toString: '$minPrice' },
              max: { $toString: '$maxPrice' },
            },
          },
        ]);

        const categories = await Product.distinct('category').sort();

        res.status(200).json({
          prices: prices.length > 0 ? prices[0] : null,
          ratings: { min: 0, max: 5 },
          categories,
        });
      } catch (error) {
        response.error(res, error as Error);
      }
    default:
      response.methodNotAllowed(res, req.method as string, ['GET']);
  }
}
