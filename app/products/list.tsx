'use client';
import React, { useEffect, useMemo, useState } from 'react';
import largeData from '@mock/large/products.json';
import smallData from '@mock/small/products.json';
import { useFilter } from '@/app/contexts/product-filter';
import Link from 'next/link';
import { Product } from '@type/products';
import ReactPaginate from 'react-paginate';

const PAGE_SIZE = 21;

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
        Math.round(product.rating) >= ratingFilter &&
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
      <div className='z-10 w-full items-center justify-between text-sm lg:flex'>
        <div className='grid w-full lg:grid-cols-3 lg:gap-6 lg:text-left'>
          {paginatedData.map((product) => (
            <div
              key={product.id}
              className='group rounded-lg shadow-lg overflow-hidden border border-gray-700 bg-gray-800 transition-colors duration-300 hover:bg-gray-700'
            >
              <Link href={`/products/${product.id}`}>
                <div className='p-5'>
                  <h3 className='mb-3 text-2xl font-semibold text-white'>{product.name}</h3>
                  <p className='m-0 text-lg text-gray-300 font-bold'>${product.price}</p>
                  <p className='mt-2 text-sm text-gray-400'>{product.description}</p>
                  <span className='inline-block mt-3 px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded'>
                    {product.category}
                  </span>
                  <div className='mt-3 flex items-center'>
                    <div className='flex items-center'>
                      {Array.from({ length: 5 }, (_, index) => (
                        <svg
                          key={index}
                          className={`w-4 h-4 ${index < product.rating ? 'text-yellow-400' : 'text-gray-500'}`}
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118l-3.39-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z' />
                        </svg>
                      ))}
                    </div>
                    <span className='ml-2 text-sm text-gray-400'>({product.numReviews} reviews)</span>
                  </div>
                  <div className='mt-3 text-sm text-gray-400'>
                    <p>Stock: {product.countInStock}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-around w-full border-t-2 pt-4 mt-8'>
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
