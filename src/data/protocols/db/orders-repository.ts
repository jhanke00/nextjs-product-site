/* eslint-disable no-unused-vars */
import { IOrder } from '@/src/domain/models';

export interface IOrdersRepository {
  insertMany: (products: IOrder[]) => Promise<void>;
}
