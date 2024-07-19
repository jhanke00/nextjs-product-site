'use client';
import largeData from '@/src/mock/large/products.json';
import smallData from '@/src/mock/small/products.json';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const PAGE_SIZE = 20;

export default function Products() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  let rawPageParam = searchParams?.get('page');
  const currentPage = rawPageParam && !Number.isNaN(Number(rawPageParam)) ? Number(rawPageParam) : 1;

  const data = [...largeData, ...smallData];
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const productData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <div className='grid lg:max-w-5xl lg:w-full lg:grid-cols-2 lg:text-left'>
          {productData.map((product) => (
            <div
              key={product.id}
              className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
            >
              <Link href={`/products/${product.id}`}>
                <h3 className={`mb-3 text-2xl font-semibold`}>{product.name}</h3>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Price: {product.price}</p>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Description: {product.description}</p>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Category: {product.category}</p>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Rating: {product.rating}</p>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Reviews: {product.numReviews}</p>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Stock: {product.countInStock}</p>
              </Link>
            </div>
          ))}
        </div>
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
          <button onClick={nextPage} disabled={currentPage === totalPages} className='disabled:opacity-80'>
            Next
          </button>
          ...
          <button onClick={goToLastPage} disabled={currentPage === totalPages} className='disabled:opacity-80'>
            Last page
          </button>
        </div>
      </div>
    </main>
  );
}
