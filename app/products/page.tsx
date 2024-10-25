import Link from 'next/link';
import { z } from 'zod';
import { createSearchParamsCache, parseAsBoolean, parseAsInteger, parseAsString } from 'nuqs/server';
import { db } from '@/infra/db';
import { ProductRepository } from '@/src/utils/products/repository';
import { nonNullishValues } from '@/src/utils/helpers';
import ProductsSection from '@components/products/Section';

type Props = {
  searchParams: Promise<Record<string, string>>;
};

const PAGE_SIZE = 20;
const productRepository = ProductRepository({ db });

const searchParamsValidator = z.object({
  page: z.number().int().positive().default(1),
  search: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.number().int().optional(),
  maxPrice: z.number().int().optional(),
  topRated: z.boolean().optional(),
  inStock: z.boolean().optional(),
  withReviews: z.boolean().optional(),
});

const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  search: parseAsString,
  category: parseAsString,
  minPrice: parseAsInteger,
  maxPrice: parseAsInteger,
  topRated: parseAsBoolean,
  inStock: parseAsBoolean,
  withReviews: parseAsBoolean,
});

export default async function Products({ searchParams }: Props) {
  const urlParams = await searchParams;
  const cachedSearchParams = searchParamsCache.parse(urlParams);
  const parsedParams = searchParamsValidator.parse(nonNullishValues(cachedSearchParams));
  const { page, search, category, minPrice, maxPrice, topRated, withReviews, inStock } = parsedParams;

  const [{ products, previousPage, totalPages, nextPage }, categories, priceRange] = await Promise.all([
    productRepository.getAllPaginated({
      search,
      page,
      size: PAGE_SIZE,
      filter: {
        category,
        minPrice,
        maxPrice,
        topRated,
        inStock,
        withReviews,
      },
    }),
    productRepository.getCategories(),
    productRepository.getPriceRange(),
  ]);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <ProductsSection products={products} categories={categories} priceRange={priceRange} params={parsedParams} />

      <div className='flex justify-around w-full border-t-2 pt-4'>
        <Link
          className='cursor-pointer hover:underline'
          href={{
            pathname: '/products',
            query: { ...parsedParams, page: previousPage },
          }}
        >
          Previous
        </Link>
        <span>
          Page {page} of {totalPages}
        </span>
        <Link
          className='cursor-pointer hover:underline'
          href={{
            pathname: '/products',
            query: { ...parsedParams, page: nextPage },
          }}
        >
          Next
        </Link>
      </div>
    </main>
  );
}
