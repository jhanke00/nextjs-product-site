import { GetUserAmountSpentWithOrdersService } from './get-user-amout-spent-with-orders-service';
import { ok } from '../../helpers/http-helpers';
import { makeOrdersDbRepositoryStub } from '@/src/data/usecases/tests/orders-repository-stub';
import { IOrder } from '@/src/domain/models';
import { CurrencyEnum } from '@/src/utils/enums/currency-enum';

const makeSut = () => {
  const ordersDbRepositoryStub = makeOrdersDbRepositoryStub();
  const sut = new GetUserAmountSpentWithOrdersService(ordersDbRepositoryStub);
  return { sut, ordersDbRepositoryStub };
};

describe('GetUserAmountSpentWithOrdersService', () => {
  it('should return 0 when there are no orders', async () => {
    const { sut, ordersDbRepositoryStub } = makeSut();
    const userId = '626b9d27-7e6b-4b22-9fc9-13e5316c1124';

    ordersDbRepositoryStub.getUserOrders.mockResolvedValueOnce(null);

    const response = await sut.exec(userId);

    expect(response).toEqual(ok({ totalAmount: 'R$ 0.00' }));
    expect(ordersDbRepositoryStub.getUserOrders).toHaveBeenCalledWith(userId);
  });

  it('should calculate total amount spent by the user', async () => {
    const { sut, ordersDbRepositoryStub } = makeSut();
    const userId = '626b9d27-7e6b-4b22-9fc9-13e5316c1124';
    const orders = [{ total: 100.5 }, { total: 200.75 }, { total: 50 }] as unknown as IOrder[];

    ordersDbRepositoryStub.getUserOrders.mockResolvedValueOnce(orders);

    const response = await sut.exec(userId);

    expect(response).toEqual(ok({ totalAmount: 'R$ 351.25' }));
    expect(ordersDbRepositoryStub.getUserOrders).toHaveBeenCalledWith(userId);
  });

  it('should use the correct currency when specified', async () => {
    let { sut, ordersDbRepositoryStub } = makeSut();
    sut = new GetUserAmountSpentWithOrdersService(ordersDbRepositoryStub, CurrencyEnum.USD);
    const userId = '626b9d27-7e6b-4b22-9fc9-13e5316c1124';
    const orders = [{ total: 50.5 }, { total: 150.25 }] as unknown as IOrder[];

    ordersDbRepositoryStub.getUserOrders.mockResolvedValueOnce(orders);

    const response = await sut.exec(userId);

    expect(response).toEqual(ok({ totalAmount: '$ 200.75' }));
    expect(ordersDbRepositoryStub.getUserOrders).toHaveBeenCalledWith(userId);
  });

  it('should format the amount correctly', async () => {
    const { sut, ordersDbRepositoryStub } = makeSut();
    const userId = '626b9d27-7e6b-4b22-9fc9-13e5316c1124';
    const orders = [{ total: 20.2 }, { total: 30.3 }] as unknown as IOrder[];

    ordersDbRepositoryStub.getUserOrders.mockResolvedValueOnce(orders);

    const response = await sut.exec(userId);

    expect(response).toEqual(ok({ totalAmount: 'R$ 50.50' }));
    expect(ordersDbRepositoryStub.getUserOrders).toHaveBeenCalledWith(userId);
  });
});
