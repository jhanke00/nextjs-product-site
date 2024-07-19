'use client';
import largeData from '@/src/mock/large/products.json';
import smallData from '@/src/mock/small/products.json';
import { ChangeEvent, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ProductCard } from './product-card';

const PAGE_SIZE = 20;

export default function Products() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  let rawPageParam = searchParams?.get('page');
  const currentPage = rawPageParam && !Number.isNaN(Number(rawPageParam)) ? Number(rawPageParam) : 1;

  let search = searchParams?.get('search') ?? '';

  const data = [...largeData, ...smallData];
  const filteredData = search ? data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())) : data;

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const productData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  const updateSearchParams = (key: string, value: any) => {
    const params = searchParams ? new URLSearchParams(searchParams.toString()) : new URLSearchParams();
    params.set(key, String(value));
    const newParams = params.toString();
    router.push(`${pathname}?${newParams}`);
  };

  if (Number.isNaN(Number(rawPageParam)) || currentPage <= 0 || currentPage > totalPages) {
    updateSearchParams('page', 1);
  }

  const nextPage = () => {
    updateSearchParams('page', currentPage + 1);
  };

  const prevPage = () => {
    updateSearchParams('page', currentPage - 1);
  };

  const goToFirstPage = () => {
    updateSearchParams('page', 1);
  };

  const goToLastPage = () => {
    updateSearchParams('page', totalPages);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    updateSearchParams('search', value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <div className='mx-auto mb-3'>
        <input
          type='text'
          placeholder='Search for a product...'
          className='px-2 py-1 rounded-md outline-none text-md'
          value={search}
          onChange={handleInputChange}
        />
      </div>

      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        {productData.length > 0 ? (
          <div className='grid lg:max-w-5xl lg:w-full lg:grid-cols-2 lg:text-left'>
            {productData.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  price: Number(product.price),
                }}
              />
            ))}
          </div>
        ) : (
          <span className='text-2xl font-normal mx-auto my-20'>No product found</span>
        )}
      </div>

      <div className='flex justify-around w-full border-t-2 pt-4'>
        <div className='flex items-center gap-3'>
          <button onClick={goToFirstPage} disabled={currentPage === 1} className='disabled:opacity-80'>
            First page
          </button>
          ...
          <button onClick={prevPage} disabled={currentPage === 1} className='disabled:opacity-80'>
            Previous
          </button>
        </div>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className='flex items-center gap-3'>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className='disabled:opacity-80'
          >
            Next
          </button>
          ...
          <button
            onClick={goToLastPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className='disabled:opacity-80'
          >
            Last page
          </button>
        </div>
      </div>
    </main>
  );
}
