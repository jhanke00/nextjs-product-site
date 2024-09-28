import { ProductsDbRepository } from '@/src/data/usecases/products-repository';
import { IValidator } from '@/src/domain/validators/validator';
import { FindProductByIdService } from './find-product-by-id-service';
import { ok } from '../../helpers/http-helpers';

const makeProductsDbRepository = (): ProductsDbRepository => {
  return {
    findById: jest.fn(),
  } as unknown as ProductsDbRepository;
};

const makeValidator = (): IValidator<{ id: string }> => {
  return {
    validate: jest.fn(),
  };
};

const makeSut = () => {
  const productDbRepository = makeProductsDbRepository();
  const validator = makeValidator();
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

    (validator.validate as jest.Mock).mockReturnValueOnce(false);

    const response = await sut.exec('');

    expect(response.statusCode).toEqual(400);
  });

  test('should call validator with correct id', async () => {
    const { sut, validator } = makeSut();

    await sut.exec('123');

    expect(validator.validate).toHaveBeenCalledWith({ id: '123' });
  });

  test('should return 200 and call productDbRepository.findById if id is valid', async () => {
    const { sut, productDbRepository, validator } = makeSut();

    (validator.validate as jest.Mock).mockReturnValueOnce(true);

    const product = { id: '123', name: 'Test Product' };
    (productDbRepository.findById as jest.Mock).mockResolvedValueOnce(product);

    const response = await sut.exec('123');

    expect(response).toEqual(ok(product));
    expect(productDbRepository.findById).toHaveBeenCalledWith('123');
  });

  test('should throw if productDbRepository.findById throws', async () => {
    const { sut, productDbRepository, validator } = makeSut();

    (validator.validate as jest.Mock).mockReturnValueOnce(true);

    (productDbRepository.findById as jest.Mock).mockRejectedValueOnce(new Error('any_error'));

    await expect(sut.exec('123')).rejects.toThrow('any_error');
  });
});
