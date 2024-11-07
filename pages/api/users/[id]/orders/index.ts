import { allMockOrders } from '@/src/mock/helpers/allMockOrders';
import { createController } from '@/src/utils/createController';
import { NextApiRequest, NextApiResponse } from 'next';

const getHandler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id, page: queryPage = '1', perPage: queryPerPage = '10' } = request.query;

  const page = parseInt(queryPage as string);
  const perPage = parseInt(queryPerPage as string);

  const orders = allMockOrders.filter((order) => order.user === id);
  const orderedOrders = orders.sort((first, second) => {
    // Order by most recent first
    return new Date(second.time).getTime() - new Date(first.time).getTime();
  });

  const ordersWindowStartIndex = (page - 1) * perPage;
  const ordersWindowEndIndex = page * perPage;
  const ordersWindow = orderedOrders.slice(ordersWindowStartIndex, ordersWindowEndIndex);

  const numberOfPages = Math.ceil(orders.length / perPage);

  const responseData = {
    data: ordersWindow,
    meta: {
      page,
      perPage,
      numberOfPages,
    },
  };

  response.json(responseData);
};

export default createController({
  get: getHandler,
});
