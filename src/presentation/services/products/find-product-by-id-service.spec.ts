import { FindProductByIdService } from './find-product-by-id-service';
import { ok } from '../../helpers/http-helpers';
import { makeProductsDbRepositoryStub } from '@/src/data/usecases/tests/products-repository-stub';
import { makeValidatorStub } from '@/src/domain/validators/test/validator-stub';

const makeSut = () => {
  const productDbRepository = makeProductsDbRepositoryStub();
  const validator = makeValidatorStub<{ id: string }>();
  const sut = new FindProductByIdService(productDbRepository, validator);

  return {
    sut,
    productDbRepository,
    validator,
  };
};

describe('FindProductByIdService', () => {
  test('should return 400 if id is invalid', async () => {
    const { sut, validator } = makeSut();

    validator.validate.mockReturnValueOnce({
      isValid: false,
      output: { id: '' },
    });

    const response = await sut.exec('');

    expect(response.statusCode).toEqual(400);
  });

  test('should call validator with correct id', async () => {
    const { sut, validator } = makeSut();

    validator.validate.mockReturnValueOnce({
      isValid: true,
      output: { id: '123' },
    });

    await sut.exec('123');

    expect(validator.validate).toHaveBeenCalledWith({ id: '123' });
  });

  test('should return 200 and call productDbRepository.findById if id is valid', async () => {
    const { sut, productDbRepository, validator } = makeSut();
    const mockProductData = {
      _id: '64e8f75f1d6d9a0001f4b123',
      name: 'Smartphone XYZ',
      price: 699.99,
      description: 'A powerful smartphone with the latest features and sleek design.',
      category: 'Electronics',
      rating: 4.5,
      numReviews: 234,
      countInStock: 120,
    };

    validator.validate.mockReturnValueOnce({
      isValid: true,
      output: { id: '123' },
    });
    productDbRepository.findById.mockResolvedValueOnce(mockProductData);

    const response = await sut.exec('123');

    expect(response).toEqual(ok(mockProductData));
    expect(productDbRepository.findById).toHaveBeenCalledWith('123');
  });

  test('should throw if productDbRepository.findById throws', async () => {
    const { sut, productDbRepository, validator } = makeSut();

    validator.validate.mockReturnValueOnce({
      isValid: true,
      output: { id: '' },
    });

    productDbRepository.findById.mockRejectedValueOnce(new Error('any_error'));

    await expect(sut.exec('123')).rejects.toThrow('any_error');
  });
});
