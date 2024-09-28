import { makeProductsDbRepository } from '@/src/data/factories/products-db-repository-factory';

import { SchemaValidator } from '@/infra/validators/schema-validator';
import { FindByIdSchema } from '@/infra/validators/schemas';
import { FindProductByIdService } from '@/src/presentation/services/products/find-product-by-id-service';

export const makeFindProductByIdService = () => {
  const validator = new SchemaValidator(FindByIdSchema);
  const productsDbRepository = makeProductsDbRepository();
  const findProductByIdService = new FindProductByIdService(productsDbRepository, validator);
  return findProductByIdService;
};
