import { IHttpResponse, ok } from '../../helpers/http-helpers';
import { OrdersDbRepository } from '@/src/data/usecases/orders-repository';

export class GetUserOrdersService {
  private readonly ordersDbRepository: OrdersDbRepository;

  constructor(ordersDbRepository: OrdersDbRepository) {
    this.ordersDbRepository = ordersDbRepository;
  }
  async exec(userId: string): Promise<IHttpResponse> {
    const orders = await this.ordersDbRepository.getUserOrders(userId);

    return ok(orders);
  }
}
