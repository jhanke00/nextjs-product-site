import { makeUsersDbRepository } from '@/src/data/factories';
import { makeProductsDbRepository } from '@/src/data/factories/products-db-repository-factory';
import { IProductInserManyInput } from '@/src/data/protocols/db/dtos/products-repository.dto';
import { IUsersInserManyInput } from '@/src/data/protocols/db/dtos/users-repository.dto';
import products from '@/src/mock/large/products.json';
import users from '@/src/mock/large/users.json';

export const seedProductsTable = async () => {
  const productsDbRepository = makeProductsDbRepository();
  const usersDbRepository = makeUsersDbRepository();

  try {
    await productsDbRepository.insertMany(products as unknown as IProductInserManyInput[]);
    await usersDbRepository.insertMany(users as unknown as IUsersInserManyInput[]);
    return 'Seed added successfully !';
  } catch (error) {
    return 'Error while seeding!';
  }
};
