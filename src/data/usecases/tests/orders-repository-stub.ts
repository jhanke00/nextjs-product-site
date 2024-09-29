import { OrdersDbRepository } from '../orders-repository';

export const makeOrdersDbRepositoryStub = (): jest.Mocked<OrdersDbRepository> => {
  return {
    insertMany: jest.fn(),
    getUserOrders: jest.fn(),
  } as unknown as jest.Mocked<OrdersDbRepository>;
};
