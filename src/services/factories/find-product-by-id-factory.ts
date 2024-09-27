import { makeProductsDbRepository } from '@/src/data/factories/products-db-repository-factory';
import { FindProductByIdService } from '../services/find-product-by-id-service';
import { SchemaValidator } from '@/infra/validators/schema-validator';
import { FindByIdSchema } from '@/infra/validators/schemas';


export const makeFindProductByIdService = () => {
  const validator = new SchemaValidator(FindByIdSchema);
  const productsDbRepository = makeProductsDbRepository();
  const findProductByIdService = new FindProductByIdService(productsDbRepository,validator);
  return findProductByIdService;
};