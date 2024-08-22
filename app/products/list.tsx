'use client';
import React, { useEffect, useMemo, useState } from 'react';
import largeData from '@mock/large/products.json';
import smallData from '@mock/small/products.json';
import { useFilter } from '@/app/contexts/product-filter';
import Link from 'next/link';
import { Product } from '@type/products';
import ReactPaginate from 'react-paginate';

const PAGE_SIZE = 20;

const originalData: Product[] = [...largeData, ...smallData].map((product) => {
  return {
    id: product.id,
    name: product.name,
    price: product.price as unknown as number,
    description: product.description,
    category: product.category,
    rating: product.rating,
    numReviews: product.numReviews,
    countInStock: product.countInStock,
  };
});

const ProductList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { ratingFilter, priceFilter, categoryFilter } = useFilter();
  const [data, setData] = useState<Product[]>(originalData);

  const filteredData = useMemo<Product[]>(() => {
    return data.filter(
      (product) =>
        (categoryFilter === '' || product.category === categoryFilter) &&
        product.rating >= ratingFilter &&
        product.price >= priceFilter[0] &&
        product.price <= priceFilter[1]
    );
  }, [data, categoryFilter, ratingFilter, priceFilter]);

  const pageCount = Math.ceil(filteredData.length / PAGE_SIZE);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const paginatedData = useMemo<Product[]>(() => {
    const startIndex = currentPage * PAGE_SIZE;
    return filteredData.slice(startIndex, startIndex + PAGE_SIZE);
  }, [currentPage, filteredData]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  return (
    <div className='w-3/4'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <div className='grid lg:max-w-5xl lg:w-full lg:grid-cols-2 lg:text-left'>
          {paginatedData.map((product) => (
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
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'flex justify-center items-center space-x-2 mt-4'}
          pageClassName={'px-3 py-1 rounded bg-gray-800 text-white hover:bg-gray-700'}
          activeClassName={'bg-blue-600'}
          previousClassName={'px-3 py-1 rounded bg-gray-800 text-white hover:bg-gray-700'}
          nextClassName={'px-3 py-1 rounded bg-gray-800 text-white hover:bg-gray-700'}
          disabledClassName={'opacity-50 cursor-not-allowed'}
          activeLinkClassName={'text-white'}
        />
      </div>
    </div>
  );
};

export default ProductList;
