import { db as dbPrototype } from '@/infra/db';
import { productsTable } from '@/infra/db/schema';
import { NewProduct } from '@/src/type/products';
import { and, asc, count, eq, gte, lte, max, min, sql } from 'drizzle-orm';
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
    search?: string;
    filter?: Partial<{
      category: string;
      minPrice: number;
      maxPrice: number;
      topRated: boolean;
      inStock: boolean;
      withReviews: boolean;
    }>;
  };

  const getAllPaginated = async ({ page = 1, size = 10, search, filter }: GetAllPaginatedProps) => {
    const whereClauses = [
      search && sql`to_tsvector('english', ${productsTable.name}) @@ plainto_tsquery('english', ${search})`,
      filter?.category && eq(productsTable.category, filter.category),
      filter?.minPrice && gte(productsTable.price, filter.minPrice),
      filter?.maxPrice && lte(productsTable.price, filter.maxPrice),
      filter?.topRated && gte(productsTable.rating, 4),
      filter?.inStock && gte(productsTable.countInStock, 1),
      filter?.withReviews && gte(productsTable.numReviews, 1),
    ].filter(Boolean);

    const hasWhere = whereClauses.length > 0;
    const where = and(...whereClauses);

    const getProducts = async () => {
      return db.query.productsTable.findMany({
        limit: size,
        offset: (page - 1) * size,
        orderBy: [asc(productsTable.id)],
        ...(hasWhere && { where }),
      });
    };

    const countResults = async () => {
      if (!hasWhere) {
        return countAll();
      }

      const result = await db.select({ count: count() }).from(productsTable).where(where);

      return result.at(0)?.count ?? 0;
    };

    // TODO: Combine these two queries into a single one to improve performance
    const [products, totalProducts] = await Promise.all([getProducts(), countResults()]);

    const totalPages = Math.max(1, Math.ceil(totalProducts / size));
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

  const getCategories = async () => {
    return db
      .selectDistinct({ category: productsTable.category })
      .from(productsTable)
      .then((result) => result.map((row) => row.category));
  };

  const getPriceRange = async () => {
    return db
      .select({
        max: max(productsTable.price),
        min: min(productsTable.price),
      })
      .from(productsTable)
      .then((result) => {
        const first = result.at(0);

        return [first?.min ?? 0, first?.max ?? 0] as const;
      });
  };

  return {
    countAll,
    getAllPaginated,
    getById,
    insertMany,
    getCategories,
    getPriceRange,
  };
}

export type ProductRepository = ReturnType<typeof ProductRepository>;
