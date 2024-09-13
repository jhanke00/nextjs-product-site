import { Product, ProductListResponse } from '@/src/interfaces';
import { ProductApiDatasetEnum } from '@/src/enums';
import { ProductUtils } from '@/src/utils';

export class ProductRepository {
  private productUtils: ProductUtils;

  constructor() {
    this.productUtils = new ProductUtils();
  }

  public async getAllProductsPaginated(
    dataset: ProductApiDatasetEnum,
    page: number,
    limit: number
  ): Promise<ProductListResponse> {
    const products = this.getAllProducts(dataset);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const resultProducts = products.slice(startIndex, endIndex);

    return {
      products: resultProducts,
      pagination: {
        page,
        limit,
        total: products.length,
      },
    };
  }

  public getProductById(id: string, dataset: ProductApiDatasetEnum): Product {
    const productData = this.getAllProducts(dataset);

    const productInfo = productData.find((item) => item.id === id);

    if (!productInfo) {
      throw new Error('Product not found');
    }

    return productInfo;
  }

  public getAllProducts(dataset: ProductApiDatasetEnum): Product[] {
    return this.productUtils.validateDataset(dataset);
  }
}
