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

    const fakeProducts = {
      _id: '64e8f75f1d6d9a0001f4b123',
      name: 'Smartphone XYZ',
      price: 699.99,
      description: 'A powerful smartphone with the latest features and sleek design.',
      category: 'Electronics',
      rating: 4.5,
      numReviews: 234,
      countInStock: 120,
    };
    const fakeResult = {
      total: 1,
      currentPage: 1,
      lastPage: 1,
      data: [fakeProducts],
    };

    productDbRepository.getAll.mockResolvedValueOnce(fakeResult);

    const response = await sut.exec('1', '10');

    expect(response).toEqual(ok(fakeResult));
    expect(productDbRepository.getAll).toHaveBeenCalledWith('1', '10');
  });

  test('should throw if productDbRepository.getAll throws', async () => {
    const { sut, productDbRepository } = makeSut();

    productDbRepository.getAll.mockRejectedValueOnce(new Error('any_error'));

    await expect(sut.exec('1', '10')).rejects.toThrow('any_error');
  });
});
