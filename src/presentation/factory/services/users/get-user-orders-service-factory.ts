import { makeOrdersDbRepository } from '@/src/data/factories/orders-db-repository-factory';
import { GetUserOrdersService } from '@/src/presentation/services/users/get-user-orders-service';

export const makeGetUserOrdersService = () => {
  const ordersDbRepository = makeOrdersDbRepository();
  const findUserByEmailService = new GetUserOrdersService(ordersDbRepository);

  return findUserByEmailService;
};
