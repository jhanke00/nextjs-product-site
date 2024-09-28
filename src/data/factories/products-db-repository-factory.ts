import { ProductsMongoRepository } from '@/infra/db/mongodb/repositories/products-mongo-repository';
import { ProductsDbRepository } from '../usecases/products-repository';

export const makeProductsDbRepository = () => {
  const mongoProductsRepository = new ProductsMongoRepository();
  return new ProductsDbRepository(mongoProductsRepository);
};
