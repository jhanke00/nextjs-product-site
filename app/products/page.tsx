'use client';
import { Product } from '@/src/type/products';
import { getProducts } from '@/src/mock/products';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import ProductComponent from '@/src/components/product';

const PAGE_SIZE = 20;

export default function Products() {
  const data: Product[] = useMemo(() => getProducts(), []);
  const totalPages: number = useMemo(() => Math.ceil(data.length / PAGE_SIZE), []);
  const [dataDisplayed, setDataDisplayed] = useState(data.slice(0, PAGE_SIZE));
  const [currentPage, setCurrentPage] = useState(1);

  const changePage = (direction: 1 | -1) => {
    setCurrentPage(currentPage + direction);
  };

  useEffect(() => {
    setDataDisplayed(data.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE));
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <div className='grid lg:max-w-5xl lg:w-full lg:grid-cols-2 lg:text-left'>
          {dataDisplayed.map((product) => (
            <div
              key={product.id}
              className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
            >
              <Link href={`/products/${product.id}`}>
                <ProductComponent product={product} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-around w-full border-t-2 pt-4'>
        <button onClick={() => changePage(-1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => changePage(1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </main>
  );
}
