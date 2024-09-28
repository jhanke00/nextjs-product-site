import { ok } from '@/src/presentation/helpers/http-helpers';
import { makeProductsDbRepositoryStub } from '@/src/data/usecases/tests/products-repository-stub';
import { GetAllProductsService } from './get-all-products-service';

const makeSut = () => {
  const productDbRepository = makeProductsDbRepositoryStub();
  const sut = new GetAllProductsService(productDbRepository);

  return {
    sut,
    productDbRepository,
  };
};

describe('GetAllProductsService', () => {
  test('should call getAll method of ProductsDbRepository with correct parameters', async () => {
    const { sut, productDbRepository } = makeSut();

    await sut.exec('1', '10');

    expect(productDbRepository.getAll).toHaveBeenCalledWith('1', '10');
  });

  test('should return 200 and call productDbRepository.getAll with valid params', async () => {
    const { sut, productDbRepository } = makeSut();

    const fakeProducts = [{ id: '1', name: 'Test Product' }];
    const fakeResult = {
      total: 1,
      currentPage: 1,
      lastPage: 1,
      data: fakeProducts,
    };

    (productDbRepository.getAll as jest.Mock).mockResolvedValueOnce(fakeResult);

    const response = await sut.exec('1', '10');

    expect(response).toEqual(ok(fakeResult));
    expect(productDbRepository.getAll).toHaveBeenCalledWith('1', '10');
  });

  test('should throw if productDbRepository.getAll throws', async () => {
    const { sut, productDbRepository } = makeSut();

    (productDbRepository.getAll as jest.Mock).mockRejectedValueOnce(new Error('any_error'));

    await expect(sut.exec('1', '10')).rejects.toThrow('any_error');
  });
});
