import { ProductsMongoRepository } from '@/infra/db/mongodb/products/products-mongo-repository';
import { IProductInserManyInput } from '../protocols/db/dtos/products-repository.dto';
import { IProduct } from '@/src/domain/models/products';

export class ProductsDbRepository {
  private readonly productMongoRepository: ProductsMongoRepository;

  constructor(productMongoRepository: ProductsMongoRepository) {
    this.productMongoRepository = productMongoRepository;
  }
  async insertMany(products: IProductInserManyInput[]): Promise<void> {
    const transformedProducts = products.map((product) => ({
      _id: product.id,
      name: product.name,
      price: Number(product.price),
      description: product.description,
      category: product.category,
      rating: product.rating,
      numReviews: product.numReviews,
      countInStock: product.countInStock,
    }));
    await this.productMongoRepository.insertMany(transformedProducts);
  }

  async findById(id: string): Promise<IProduct | null> {
    return await this.productMongoRepository.findById(id);
  }
}
