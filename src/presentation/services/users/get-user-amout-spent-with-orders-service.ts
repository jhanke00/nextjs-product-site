/* eslint-disable no-unused-vars */
import { CurrencyEnum } from '@/src/utils/enums/currency-enum';
import { IHttpResponse, ok } from '../../helpers/http-helpers';
import { OrdersDbRepository } from '@/src/data/usecases/orders-repository';

export class GetUserAmountSpentWithOrdersService {
  private readonly ordersDbRepository: OrdersDbRepository;
  private readonly usedCurrency: CurrencyEnum;
  constructor(ordersDbRepository: OrdersDbRepository, usedCurrency?: CurrencyEnum) {
    this.ordersDbRepository = ordersDbRepository;
    this.usedCurrency = usedCurrency || CurrencyEnum.BRL;
  }
  async exec(userId: string): Promise<IHttpResponse> {
    const orders = await this.ordersDbRepository.getUserOrders(userId);

    let totalAmount = 0;
    if (!orders) {
      return ok({ totalAmount: this.formatAmountResponse(totalAmount) });
    }

    orders.map((order) => {
      totalAmount += order.total;
    });

    return ok({ totalAmount: this.formatAmountResponse(totalAmount) });
  }

  private formatAmountResponse(amount: number) {
    return `${this.usedCurrency} ${amount.toFixed(2)}`;
  }
}
