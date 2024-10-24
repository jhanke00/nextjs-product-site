import { db } from '@/infra/db';
import { ProductRepository } from '@/src/utils/products/repository';
import List from '@components/products/List';
import Link from 'next/link';

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const PAGE_SIZE = 20;

const productRepository = ProductRepository({ db });

export default async function Products({ searchParams }: Props) {
  const { page = '1' } = await searchParams;
  const sanitizedPage = Math.max(1, parseInt(page));
  const currentPage = Number.isNaN(sanitizedPage) ? 1 : sanitizedPage;

  const { products, previousPage, totalPages, nextPage } = await productRepository.getAllPaginated({
    page: currentPage,
    size: PAGE_SIZE,
  });

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <List productData={products} currentPage={0} />
      </div>

      <div className='flex justify-around w-full border-t-2 pt-4'>
        <Link
          className='cursor-pointer hover:underline'
          href={{
            pathname: '/products',
            query: { page: previousPage },
          }}
        >
          Previous
        </Link>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Link
          className='cursor-pointer hover:underline'
          href={{
            pathname: '/products',
            query: { page: nextPage },
          }}
        >
          Next
        </Link>
      </div>
    </main>
  );
}
