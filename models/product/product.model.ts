// Libs
import ProductsMockModelLib from './lib';

// Types
import ModelType from '../../src/type/model';
import { ProductType } from '../../src/type/products';

// Interfaces
import { ProductQueryFiltersInterface } from './type';

// Consts
import mockedProducts from '../../src/mock/small/products.json';

class ProductsMockModel implements ModelType {
  private dataset: ProductType[];
  private lib;

  constructor() {
    this.dataset = mockedProducts;
    this.lib = new ProductsMockModelLib(this.dataset);
  }

  async getAll() {
    return this.dataset;
  }

  async getById(id: string) {
    return this.dataset.find((product) => product.id === id);
  }

  async getByQuery(queryFilters: ProductQueryFiltersInterface) {
    return this.lib.filterByQuery(queryFilters);
  }
}

export default ProductsMockModel;
