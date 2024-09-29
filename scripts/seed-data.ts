import { makeUsersDbRepository } from '@/src/data/factories';
import { makeProductsDbRepository } from '@/src/data/factories/products-db-repository-factory';
import { IProductInserManyInput } from '@/src/data/protocols/db/dtos/products-repository.dto';
import { IUsersInserManyInput } from '@/src/data/protocols/db/dtos/users-repository.dto';
import products from '@/src/mock/large/products.json';
import users from '@/src/mock/large/users.json';
import orders from '@/src/mock/large/orders.json'
import { makeOrdersDbRepository } from '@/src/data/factories/orders-db-repository-factory';
import { IOrder } from '@/src/domain/models';

export const seedData = async () => {
  const productsDbRepository = makeProductsDbRepository();
  const usersDbRepository = makeUsersDbRepository();
  const ordersDbRepository = makeOrdersDbRepository()

  try {
    await productsDbRepository.insertMany(products as unknown as IProductInserManyInput[]);
    await usersDbRepository.insertMany(users as unknown as IUsersInserManyInput[]);
    await ordersDbRepository.insertMany(orders as IOrder[])
    return 'Seed added successfully !';
  } catch (error) {
    return 'Error while seeding!';
  }
};
