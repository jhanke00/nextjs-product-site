// Types
import { ProductType } from '../products';

export default interface ModelType {
  getAll(): Promise<ProductType[]>;
  getById(id: string): Promise<ProductType | undefined>;
  getByQuery(query: object): Promise<ProductType[] | []>;
}
