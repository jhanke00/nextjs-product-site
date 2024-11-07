import { allMockOrders } from '@/src/mock/helpers/allMockOrders';
import { createController } from '@/src/utils/createController';
import { NextApiRequest, NextApiResponse } from 'next';

const getHandler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;

  const mockUserOrders = allMockOrders.filter((order) => order.user === id);

  const count = mockUserOrders.length;
  const total = mockUserOrders.reduce((total, order) => total + order.total, 0);

  const responseData = {
    count,
    total,
  };

  response.json(responseData);
};

export default createController({
  get: getHandler,
});
