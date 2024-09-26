import { makeProductsDbRepository } from '@/src/data/factories/products-db-repository-factory';
import { IProductInserManyInput } from '@/src/data/protocols/db/dtos/products-repository.dto';
import products from '@/src/mock/large/products.json';

export const seedProductsTable = async () => {
  const productsDbRepository = makeProductsDbRepository();

  try {
    await productsDbRepository.insertMany(products as unknown as IProductInserManyInput[]);
    return 'Seed added successfully !';
  } catch (error) {
    return 'Error while seeding!';
  }
};

seedProductsTable();