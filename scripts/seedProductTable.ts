import { IProductInserManyRequest } from '@/src/data/protocols/db/dtos/products-repository.dto';
import { ProductsDbRepository } from '@/src/data/usecases/products-repository';
import products from '../src/mock/large/products.json';

const seedProductsTable = async () => {
  const productsDbRepository = new ProductsDbRepository();

  try {
    await productsDbRepository.insertMany(products as unknown as IProductInserManyRequest[]);
    console.log('Seed added successfully !');
  } catch (error) {
    console.log('Error while seeding!');
  }
};

seedProductsTable();
