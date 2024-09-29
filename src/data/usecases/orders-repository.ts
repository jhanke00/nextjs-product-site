import { IOrder } from '@/src/domain/models';
import { OrdersMongoRepository } from '@/infra/db/mongodb/repositories/orders-mongo-repository';

export class OrdersDbRepository {
  private readonly ordersMongoRepository: OrdersMongoRepository;

  constructor(ordersMongoRepository: OrdersMongoRepository) {
    this.ordersMongoRepository = ordersMongoRepository;
  }

  async insertMany(orders: IOrder[], batchSize: number = 1000): Promise<void> {
    const promises = [];

    for (let i = 0; i < orders.length; i += batchSize) {
      const batch = orders.slice(i, i + batchSize);
      promises.push(this.ordersMongoRepository.insertMany(batch));
    }

    await Promise.all(promises);
    return;
  }

  async getUserOrders(userId: string): Promise<IOrder[] | null> {
    return await this.ordersMongoRepository.getUserOrders(userId);
  }
}
