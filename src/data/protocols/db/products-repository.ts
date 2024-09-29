/* eslint-disable no-unused-vars */
import { IProduct } from '@/src/domain/models/products';

export interface IProductRepository {
  insertMany: (products: IProduct[]) => Promise<void>;
  findById: (id: string) => Promise<IProduct | null>;
  getAll: (
    skip: number,
    limit: number
  ) => Promise<{
    products: IProduct[];
    totalRecords: number;
  }>;
}
