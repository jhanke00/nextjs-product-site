'use client';
import React, { useEffect } from 'react';
import { useFilter } from '@/app/contexts/product-filter';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import { FaStar } from 'react-icons/fa';
import { getProducts } from '@/src/services/products/get.products';
import { Loading } from '@components/Loading';

const ProductList: React.FC = () => {
  const { filters, currentPage, setCurrentPage } = useFilter();

  const { data, pagination, isLoading } = getProducts({
    ...filters,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  if (isLoading) return <Loading />;

  if (!data || !data.length) {
    return <p>Not products found</p>;
  }

  return (
    <div className='w-3/4'>
      <div className='z-10 w-full items-center justify-between text-sm lg:flex'>
        <div className='grid w-full lg:grid-cols-3 lg:gap-6 lg:text-left'>
          {data.map((product) => (
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
                        <FaStar key={index} className={`text-yellow-400`} />
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
          pageCount={pagination!.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          initialPage={currentPage}
          onPageChange={handlePageClick}
          breakClassName={'break-me'}
          containerClassName={'flex justify-center items-center space-x-2 mt-4'}
          pageClassName={'px-3 py-1 rounded bg-gray-800 text-white hover:bg-gray-700'}
          activeClassName={'!bg-blue-500'}
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
