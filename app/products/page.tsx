'use client';
import largeData from '@/src/mock/large/products.json';
import smallData from '@/src/mock/small/products.json';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import StarRating from '../../src/components/star-rating';

const PAGE_SIZE = 20;

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const data = [...largeData, ...smallData];
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const productData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const formatPrice = (price: string) => {
    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber)) {
      return 'Invalid price';
    }
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceNumber);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <main className='flex min-h-screen flex-col items-center'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm mb-20 lg:flex'>
        <div className='grid lg:max-w-5xl lg:w-full lg:grid-cols-2 lg:text-left lg:gap-6'>
          {productData.map((product) => (
            <div
              key={product.id}
              className={`flex group rounded-lg border px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 ${product.countInStock === 0 ? 'opacity-40' : ''}`}
            >
              <Link
                href={product.countInStock === 0 ? '#' : `/products/${product.id}`}
                className={`flex flex-col flex-auto ${product.countInStock === 0 ? 'cursor-default' : ''}`}
                onClick={(e) => product.countInStock === 0 && e.preventDefault()}
              >
                <div className='flex-auto'>
                  <h3 className={`text-2xl font-semibold`}>{product.name}</h3>
                  <h4 className={`mb-3 text-md opacity-80`}>{product.category}</h4>
                  <p className={`mb-6 m-0 text-sm opacity-50`}>Description: {product.description}</p>
                  {product.countInStock === 0 ? (
                    <span className='bg-red-500 flex justify-end pr-1'>Out of stock</span>
                  ) : product.countInStock > 1 && product.countInStock < 10 ? (
                    <span className='bg-red-500 flex justify-end pr-1'>Only {product.countInStock} left in stock!</span>
                  ) : null}
                </div>
                <div className='flex items-center justify-right min-h-10'>
                  {product.countInStock !== 0 ? (
                    <span className={`m-0 opacity-50 font-bold text-2xl`}>{formatPrice(product.price)}</span>
                  ) : null}
                  <StarRating rating={product.rating} />
                </div>
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
