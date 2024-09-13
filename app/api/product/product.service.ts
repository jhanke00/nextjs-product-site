import { PaginationQuery, Product, ProductListResponse } from '@/src/interfaces';
import { ProductRepository } from '@/app/api/product';
import { ProductApiDatasetEnum } from '@/src/enums';
import { ProductUtils } from '@/src/utils';

export class ProductService {
  private productRepository: ProductRepository;
  private productUtils: ProductUtils;

  constructor() {
    this.productRepository = new ProductRepository();
    this.productUtils = new ProductUtils();
  }

  public async getProductList(
    dataset: ProductApiDatasetEnum,
    pagination: PaginationQuery
  ): Promise<ProductListResponse> {
    return this.productRepository.getAllProductsPaginated(dataset, pagination.page, pagination.limit);
  }

  public async getSingleProduct(id: string, dataset: ProductApiDatasetEnum): Promise<Product> {
    return this.productRepository.getProductById(id, dataset);
  }

  public async searchProduct(query: string, dataset: ProductApiDatasetEnum): Promise<Product[]> {
    const productData = this.productRepository.getAllProducts(dataset);

    return this.productUtils.searchProduct(query, productData);
  }
}
