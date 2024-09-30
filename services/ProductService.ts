import MockModel from '@/models/ProductModelMock';
import { paginatedProducts, Product, IProductService, IProductModel } from '@/src/type/products';

export default class ProductService implements IProductService {
  private model: IProductModel;
  private static instances: { [key: string]: ProductService } = {};

  public static getInstance(dataset: string): ProductService {
    if (!ProductService.instances[dataset]) {
      ProductService.instances[dataset] = new ProductService(MockModel.getInstance(dataset));
    }
    return ProductService.instances[dataset];
  }
  constructor(model: IProductModel) {
    this.model = model;
  }
  getById(id: string): Promise<Product> {
    return this.model.getById(id);
  }
  create(data: Product): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: Product): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }

  async getAll(): Promise<any> {
    return this.model.getAll();
  }

  async getPaginatedProducts(
    page: number,
    productsPerPage: number,
    query?: string,
    category?: string,
    minPrice?: number,
    maxPrice?: number,
    rating?: number
  ): Promise<paginatedProducts> {
    const { products, pages } = await this.model.getPaginatedProducts(
      page,
      productsPerPage,
      query,
      category,
      minPrice ? Number(minPrice) : undefined,
      maxPrice ? Number(maxPrice) : undefined,
      rating ? Number(rating) : undefined
    );
    const count = await this.model.getCount();
    return {
      products,
      count,
      page,
      pages,
    };
  }
}
