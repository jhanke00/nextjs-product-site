import mongoDbConnection from '../helpers/mongo-helper';
import { IOrder } from '@/src/domain/models';
import Order from '../schemas/orders-schema';
import { IOrdersRepository } from '@/src/data/protocols/db/orders-repository';

export class OrdersMongoRepository implements IOrdersRepository {
  async insertMany(orders: IOrder[]) {
    await mongoDbConnection();
    await Order.insertMany(orders);

    return;
  }
}
