import type { NextApiRequest, NextApiResponse } from 'next';
import orders from '@/src/mock/small/orders.json';
import users from '@/src/mock/small/users.json';
import { IOrderSmall } from '@/src/types/orders/index';
import response from '@/src/utils/response';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      const { order = 'asc', sort = 'time', page = 1, limit = 10 } = req.query;

      const user = users.find((user) => user.id === id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const filteredOrders = orders.filter((order) => order.user === id);

      filteredOrders.sort((a, b) => {
        let comparison = 0;

        if (sort === 'time') {
          const timeA = new Date(a.time).getTime();
          const timeB = new Date(b.time).getTime();
          comparison = timeA - timeB;
        } else {
          // Handle string and other types based on the sort field
          const valueA = a[sort as keyof IOrderSmall];
          const valueB = b[sort as keyof IOrderSmall];

          if (typeof valueA === 'string' && typeof valueB === 'string') {
            comparison = valueA.localeCompare(valueB);
          } else if (typeof valueA === 'number' && typeof valueB === 'number') {
            comparison = valueA - valueB;
          }
        }

        return order === 'desc' ? -comparison : comparison;
      });

      const totalCount = filteredOrders.length;
      const startIndex = (Number(page) - 1) * Number(limit);
      const endIndex = startIndex + Number(limit);
      const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

      res.status(200).json({
        orders: paginatedOrders.map(({ user, ...rest }) => rest),
        totalCount,
        totalPages: Math.ceil(totalCount / Number(limit)),
        currentPage: Number(page),
      });
    default:
      response.methodNotAllowed(res, req.method as string, ['GET']);
  }
}
