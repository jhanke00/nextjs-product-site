import { GetUserOrdersService } from './get-user-orders-service';
import { ok } from '../../helpers/http-helpers';
import { makeOrdersDbRepositoryStub } from '@/src/data/usecases/tests/orders-repository-stub';
import { IOrder } from '@/src/domain/models';

const makeSut = () => {
  const ordersDbRepositoryStub = makeOrdersDbRepositoryStub();
  const sut = new GetUserOrdersService(ordersDbRepositoryStub);
  return { sut, ordersDbRepositoryStub };
};

describe('GetUserOrdersService', () => {
  it('should return user orders successfully', async () => {
    const { sut, ordersDbRepositoryStub } = makeSut();
    const userId = '626b9d27-7e6b-4b22-9fc9-13e5316c1124';
    const mockedOrders = [
      {
        _id: 'any',
        user: userId,
        items: [
          {
            id: '502bb42d-2b04-4f04-914c-4b8c74788530',
            name: 'Sleek Metal Fish',
            price: 631,
            count: 1,
            _id: { $oid: '66f8ba1522c52cf784f9e1d5' },
          },
          {
            id: '86d5b7ca-b1a9-4fc5-9cb4-95d07833bb59',
            name: 'Unbranded Plastic Chicken',
            price: 568,
            count: 2,
            _id: 'any',
          },
        ],
      },
    ] as unknown as IOrder[];

    ordersDbRepositoryStub.getUserOrders.mockResolvedValueOnce(mockedOrders);

    const response = await sut.exec(userId);

    expect(response).toEqual(ok(mockedOrders));
    expect(ordersDbRepositoryStub.getUserOrders).toHaveBeenCalledWith(userId);
  });

  it('should handle case where no orders are found', async () => {
    const { sut, ordersDbRepositoryStub } = makeSut();
    const userId = '626b9d27-7e6b-4b22-9fc9-13e5316c1124';

    ordersDbRepositoryStub.getUserOrders.mockResolvedValueOnce([]);

    const response = await sut.exec(userId);

    expect(response).toEqual(ok([]));
    expect(ordersDbRepositoryStub.getUserOrders).toHaveBeenCalledWith(userId);
  });
});
