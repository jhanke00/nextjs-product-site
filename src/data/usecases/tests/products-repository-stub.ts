import { ProductsDbRepository } from '../products-repository';

export const makeProductsDbRepositoryStub = (): jest.Mocked<ProductsDbRepository> => {
  return {
    findById: jest.fn(),
    insertMany: jest.fn(),
    getAll: jest.fn(),
  } as unknown as jest.Mocked<ProductsDbRepository>;
};
