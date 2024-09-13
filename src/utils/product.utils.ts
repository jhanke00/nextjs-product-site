import smallProductsData from '@/src/mock/small/products.json';
import largeProductsData from '@/src/mock/large/products.json';
import { ProductApiDatasetEnum } from '@/src/enums';
import { Product } from '@/src/interfaces';

export class ProductUtils {
  private smallProductsData: Product[];
  private largeProductsData: Product[];

  constructor() {
    this.smallProductsData = smallProductsData;
    this.largeProductsData = largeProductsData;
  }

  public validateDataset(dataset: ProductApiDatasetEnum): Product[] {
    let products: Product[];

    if (dataset === ProductApiDatasetEnum.SMALL) {
      products = this.smallProductsData;
    } else if (dataset === ProductApiDatasetEnum.LARGE) {
      products = this.largeProductsData;
    } else {
      throw new Error('Invalid product dataset');
    }

    return products;
  }

  public async searchProduct(query: string, productData: Product[]): Promise<Product[]> {
    const filteredProducts = productData.filter((product) =>
      product.name.toLowerCase().startsWith(query.toLowerCase())
    );

    if (filteredProducts.length === 0) {
      throw new Error('No Product Found with query');
    }

    return filteredProducts;
  }
}
