import { makeProductsDbRepository } from '@/src/data/factories/products-db-repository-factory';

import { GetAllProductsService } from '@/src/presentation/services/products/get-all-products-service';

export const makeGetAllProductsService = () => {
  const productsDbRepository = makeProductsDbRepository();
  const getAllProductsService = new GetAllProductsService(productsDbRepository);
  return getAllProductsService;
};
