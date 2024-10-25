import { NextRequest } from 'next/server';
import { db } from '@/infra/db';
import { ProductRepository } from '@/src/utils/products/repository';

const PAGE_SIZE = 20;

const productRepository = ProductRepository({ db });

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get('page');
  const sanitizedPage = Math.max(1, parseInt(page ?? '1'));
  const currentPage = Number.isNaN(sanitizedPage) ? 1 : sanitizedPage;

  const { products, previousPage, totalPages, nextPage } = await productRepository.getAllPaginated({
    page: currentPage,
    size: PAGE_SIZE,
  });

  return new Response(
    JSON.stringify({
      products,
      page: currentPage,
      previousPage,
      totalPages,
      nextPage,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
