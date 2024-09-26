import { IProductRepository } from '@/src/data/protocols/db/products-repository';
import mongoDbConnection from '../helpers/mongo-helper';
import Product from '../schemas/products-schema';
import { IProduct } from '@/src/domain/models/products';

export class ProductsMongoRepository implements IProductRepository {
  async insertMany(products: IProduct[]) {
    await mongoDbConnection();
    await Product.insertMany(products);

    return;
  }

  async findById(id: string): Promise<IProduct | null> {
    await mongoDbConnection();
    return await Product.findById(id);
  }
}
