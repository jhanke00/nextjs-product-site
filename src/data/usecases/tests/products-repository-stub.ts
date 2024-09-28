import { ProductsDbRepository } from '../products-repository';

export const makeProductsDbRepositoryStub = () => {
  return {
    findById: jest.fn(),
    insertMany: jest.fn(),
    getAll: jest.fn()
  } as unknown as ProductsDbRepository; 
};