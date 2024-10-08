import type { NextApiRequest, NextApiResponse } from 'next';
import Product from '@/src/models/Product';
import Order from '@/src/models/Order';
import dbConnect from '@/src/utils/dbConnect';
import response from '@/src/utils/response';
import { IItem } from '@/src/types/orders/index';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  // Check the method in case we want to add a POST route as well to insert products
  switch (method) {
    case 'GET':
      const { order = 'asc', sort = 'time', page = 1, limit = 10 } = req.query;
      const usersPurchasedCount = 2; // At least how many users have pursched the product. We could add on the endpoint parameters as well to make dinamic for the frontend

      try {
        // Get all orders
        const orders = await Order.find().lean();

        // Create a Set to prevent duplicates, to save productId as key and an object of users
        const productUserMap: { [key: string]: Set<string> } = {};

        orders.forEach((order) => {
          order.items.forEach((item: IItem) => {
            const productId = item.id;

            if (!productUserMap[productId]) {
              productUserMap[productId] = new Set<string>();
            }

            productUserMap[productId].add(order.user);
          });
        });

        // Filter the productId set to only get where the user count is more then the usersPurchasedCount
        const filteredProducts = Object.entries(productUserMap)
          .filter(([_, userIds]) => userIds.size > usersPurchasedCount)
          .map(([productId]) => productId);

        // Add pagination, sorting functionalities
        const products = await Product.find({ _id: { $in: filteredProducts } })
          .sort({ [sort as string]: order === 'asc' ? 1 : -1 })
          .skip((Number(page) - 1) * Number(limit))
          .limit(Number(limit));

        res.status(200).json({
          products,
          totalCount: filteredProducts.length,
          totalPages: Math.ceil(filteredProducts.length / Number(limit)),
          currentPage: Number(page),
        });
      } catch (error) {
        response.error(res, error as Error);
      }

    default:
      response.methodNotAllowed(res, req.method as string, ['GET']);
  }
}
