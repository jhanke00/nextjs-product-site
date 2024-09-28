import { ProductsMongoRepository } from '@/infra/db/mongodb/products/products-mongo-repository';
import { IProductInserManyInput } from '../protocols/db/dtos/products-repository.dto';
import { IProduct } from '@/src/domain/models/products';
import { PaginationInputUtil } from '@/src/utils/pagination-input-util';
import { paginateResponse } from '@/src/utils/pagination-response-util';

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

  async getAll(page?: string, limit?: string ){
    const paginationInput = new PaginationInputUtil({page, limit});
    const products = await this.productMongoRepository.getAll(paginationInput.skip!, paginationInput.limit!);
    
    return paginateResponse({result: products.products, total: products.totalRecords},paginationInput.page, paginationInput.limit);
  }
}
