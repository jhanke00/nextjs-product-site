import { ProductRepository } from './repository';

type dbMocks = {
  selectFrom: jest.Mock;
  findMany: jest.Mock;
  findFirst: jest.Mock;
  insertValues: jest.Mock;
};

const buildDependencies = (mockOverrides: Partial<dbMocks>): any => {
  const defaultMocks = {
    selectFrom: jest.fn(() => ({
      from: jest.fn(() => []),
    })),
    findMany: jest.fn(() => {}),
    findFirst: jest.fn(() => {}),
    insertValues: jest.fn(() => {}),
  };

  const mocks = {
    ...defaultMocks,
    ...mockOverrides,
  };

  return {
    mocks,
    db: {
      select: jest.fn(() => ({
        from: mocks.selectFrom,
      })),
      query: {
        productsTable: {
          findMany: mocks.findMany,
          findFirst: mocks.findFirst,
        },
      },
      transaction: jest.fn((callback) =>
        callback({
          insert: jest.fn(() => ({
            values: mocks.insertValues,
          })),
        })
      ),
    },
  };
};

type SetupProps = {
  mockOverrides?: Partial<dbMocks>;
};

const setup = ({ mockOverrides = {} }: SetupProps) => {
  const { mocks, db } = buildDependencies(mockOverrides);

  return {
    mocks,
    productRepository: ProductRepository({ db }),
  };
};

describe('ProductRepository', () => {
  describe('#countAll', () => {
    it('should return the count of all products', async () => {
      const selectFrom = jest.fn(() => [{ count: 10 }]);
      const { productRepository } = setup({ mockOverrides: { selectFrom } });
      const result = await productRepository.countAll();

      expect(result).toBe(10);
    });
  });

  describe('#getAllPaginated', () => {
    const products = [{ id: 1 }, { id: 2 }, { id: 3 }];

    const run = async (page?: number, size?: number) => {
      const findMany = jest.fn(() => products);
      const selectFrom = jest.fn(() => [{ count: products.length }]);
      const { productRepository } = setup({ mockOverrides: { findMany, selectFrom } });

      return productRepository.getAllPaginated({ page, size });
    };

    it('defaults to page 1', async () => {
      const result = await run();
      const expected = expect.objectContaining({ page: 1 });

      expect(result).toEqual(expected);
    });

    it('defaults to size 10', async () => {
      const result = await run();
      const expected = expect.objectContaining({ size: 10 });

      expect(result).toEqual(expected);
    });

    it('returns the product list', async () => {
      const result = await run();
      const expected = expect.objectContaining({ products });

      expect(result).toEqual(expected);
    });

    it('calculates the total pages', async () => {
      const result = await run(1, 1);
      const expected = expect.objectContaining({ totalPages: 3 });

      expect(result).toEqual(expected);
    });

    it('calculates the next page', async () => {
      const result = await run(2, 1);
      const expected = expect.objectContaining({ nextPage: 3 });

      expect(result).toEqual(expected);
    });

    it('calculates the previous page', async () => {
      const result = await run(2, 1);
      const expected = expect.objectContaining({ previousPage: 1 });

      expect(result).toEqual(expected);
    });
  });

  describe('#getById', () => {
    it('should query the product by id', async () => {
      const eq = jest.fn();
      const findFirst = jest.fn((args) => args.where({ id: 'PRODUCTS_ID' }, { eq }));

      const { productRepository } = setup({ mockOverrides: { findFirst } });
      await productRepository.getById(1);

      expect(eq).toHaveBeenCalledWith('PRODUCTS_ID', 1);
    });

    it('should return the product', async () => {
      const product = { id: 1 };
      const findFirst = jest.fn(() => product);
      const { productRepository } = setup({ mockOverrides: { findFirst } });
      const result = await productRepository.getById(1);

      expect(result).toEqual(product);
    });
  });

  describe('#insertMany', () => {
    it('should insert the products', async () => {
      const products = [{ id: 1 }, { id: 2 }, { id: 3 }] as any;
      const insertValues = jest.fn();
      const { productRepository } = setup({ mockOverrides: { insertValues } });

      await productRepository.insertMany(products);

      expect(insertValues).toHaveBeenCalledWith(products);
    });

    it('should batch large amounts of products', async () => {
      const products = Array.from({ length: 5000 }).map((_, i) => ({ id: i })) as any;
      const insertValues = jest.fn();
      const { productRepository } = setup({ mockOverrides: { insertValues } });

      await productRepository.insertMany(products);

      expect(insertValues).toHaveBeenCalledTimes(5);
      expect(insertValues).toHaveBeenCalledWith(products.slice(0, 1000));
      expect(insertValues).toHaveBeenCalledWith(products.slice(1000, 2000));
      expect(insertValues).toHaveBeenCalledWith(products.slice(2000, 3000));
      expect(insertValues).toHaveBeenCalledWith(products.slice(3000, 4000));
      expect(insertValues).toHaveBeenCalledWith(products.slice(4000, 5000));
    });
  });
});
