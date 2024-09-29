import { makeOrdersDbRepository } from '@/src/data/factories/orders-db-repository-factory';
import { GetUserAmountSpentWithOrdersService } from '@/src/presentation/services/users/get-user-amout-spent-with-orders-service';

export const makeGetUserAmountSpentWithService = () => {
  const ordersDbRepository = makeOrdersDbRepository();
  const getUserAmountSpentWithOrdersService = new GetUserAmountSpentWithOrdersService(ordersDbRepository);

  return getUserAmountSpentWithOrdersService;
};
