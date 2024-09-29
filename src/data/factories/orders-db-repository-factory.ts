import { OrdersDbRepository } from '../usecases/orders-repository';
import { OrdersMongoRepository } from '@/infra/db/mongodb/repositories/orders-mongo-repository';

export const makeOrdersDbRepository = () => {
  const ordersMongoRepository = new OrdersMongoRepository();
  return new OrdersDbRepository(ordersMongoRepository);
};
