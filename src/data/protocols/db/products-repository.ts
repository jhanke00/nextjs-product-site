import { IProduct } from '@/src/domain/models/products';

export interface IProductRepository {
  insertMany: (products: IProduct[]) => Promise<void>;
}
