import { db as dbPrototype } from '@/infra/db';
import { productsTable } from '@/infra/db/schema';
import { NewProduct } from '@/src/type/products';
import { count } from 'drizzle-orm';
import chunk from 'lodash.chunk';

type Dependencies = {
  db: typeof dbPrototype;
};

const INSERT_MANY_BATCH_SIZE = 1000;

export function ProductRepository({ db }: Dependencies) {
  const countAll = async () => {
    const result = await db.select({ count: count() }).from(productsTable);

    return result.at(0)?.count ?? 0;
  };

  type GetAllPaginatedProps = {
    page?: number;
    size?: number;
  };

  const getAllPaginated = async ({ page = 1, size = 10 }: GetAllPaginatedProps) => {
    const products = await db.query.productsTable.findMany({
      limit: size,
      offset: (page - 1) * size,
    });

    const totalPages = Math.ceil((await countAll()) / size);
    const previousPage = page === 1 ? 1 : page - 1;
    const nextPage = page === totalPages ? totalPages : page + 1;

    return {
      products,
      page,
      size,
      totalPages,
      previousPage,
      nextPage,
    };
  };

  const getById = async (id: number) => {
    return db.query.productsTable.findFirst({
      where: (products, { eq }) => eq(products.id, id),
    });
  };

  const insertMany = async (products: Array<NewProduct>) => {
    const batches = chunk(products, INSERT_MANY_BATCH_SIZE);

    return db.transaction(async (tx) => {
      for (const batch of batches) {
        await tx.insert(productsTable).values(batch);
      }
    });
  };

  return {
    countAll,
    getAllPaginated,
    getById,
    insertMany,
  };
}

export type ProductRepository = ReturnType<typeof ProductRepository>;
