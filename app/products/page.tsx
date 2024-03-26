'use client';
import largeData from '@/src/mock/large/products.json';
import smallData from '@/src/mock/small/products.json';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useSearch } from '@/src/providers/SearchProvider';
import { Product } from '@/src/type/products';

const PAGE_SIZE = 20;

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const { value } = useSearch();

  const searchedData = useMemo(() => {
    const data: Product[] = [...largeData, ...smallData];
    return value
      ? data.filter((product) => {
          return Object.keys(product).some((key) =>
            product[key as keyof Product].toString().toLowerCase().includes(value.toLowerCase())
          );
        })
      : data;
  }, [value]);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const productData = searchedData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(searchedData.length / PAGE_SIZE);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (searchedData.length === 0) {
    return (
      <div className='min-h-screen text-center pt-24'>
        <p>There is no searched data with &quot;{value}&quot;.</p>
      </div>
    );
  }

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
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </main>
  );
}
