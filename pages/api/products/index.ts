import type { NextApiRequest, NextApiResponse } from 'next';
import Product from '@/src/models/Product';
import dbConnect from '@/src/utils/dbConnect';
import response from '@/src/utils/response';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  // Check the method in case we want to add a POST route as well to insert products
  switch (method) {
    case 'GET':
      const {
        order = 'asc',
        sort = 'name',
        search = '',
        categories = '',
        minPrice,
        maxPrice,
        minRating,
        maxRating,
        page = 1,
        limit = 10,
      } = req.query;

      const query: any = {};

      try {
        if (minPrice) {
          query.price = { $gte: Number(minPrice) };
        }
        if (maxPrice) {
          query.price = { ...query.price, $lte: Number(maxPrice) };
        }
        if (minRating) {
          query.rating = { $gte: Number(minRating) };
        }
        if (maxRating) {
          query.rating = { ...query.rating, $lte: Number(maxRating) };
        }
        if (categories) {
          query.category = { $in: Array.isArray(categories) ? categories : categories.split(',') };
        }
        if (search) {
          query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { category: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
          ];
        }

        const products = await Product.find(query)
          .sort({ [sort as string]: order === 'asc' ? 1 : -1 })
          .skip((Number(page) - 1) * Number(limit))
          .limit(Number(limit));

        const totalCount = await Product.countDocuments(query);

        res.status(200).json({
          products,
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
