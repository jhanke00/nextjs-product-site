/* eslint-disable import/no-anonymous-default-export */
// Libs
import { Exception, ErrorCode } from '../lib/errorHandler';

// Database
import ProductsMockModel from '../models/product/product.model';

// Interfaces
import { ProductQueryFiltersInterface } from '../models/product/type';

class ProductsService {
  private database;

  constructor() {
    this.database = new ProductsMockModel();
  }

  async getAll() {
    return this.database.getAll();
  }

  async getById(id: string) {
    const product = await this.database.getById(id);

    if (!product) {
      throw new Exception(ErrorCode.NotFound, 'Product Not Found');
    }

    return product;
  }

  async getByQuery(queryFilters: ProductQueryFiltersInterface) {
    if (!Object.keys(queryFilters).length) {
      throw new Exception(ErrorCode.BadRequest, 'Missing query parameters');
    }

    return this.database.getByQuery(queryFilters);
  }
}

export default new ProductsService();
