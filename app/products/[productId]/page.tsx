'use client';

import React from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import SimilarProducts from '../similar.products';
import { useRouter } from 'next/navigation';
import { getProductDetail } from '@/src/services/products/get.product.detail';
import { Loading } from '@components/Loading';

const productDetail = ({ params }: { params: { productId: string } }) => {
  const router = useRouter();
  const { data, isLoading } = getProductDetail({ productId: params.productId });

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <p>Product not Found</p>;
  }

  return (
    <div className='flex min-h-screen flex-col p-8'>
      <div className='p-4'>
        <button
          className=' text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg py-2 px-4 mb-4'
          onClick={() => router.push('/products')}
        >
          Back to product list
        </button>
      </div>

      <div className='max-w-4xl mx-auto p-6 rounded-lg shadow-md border border-gray-700 bg-gray-800'>
        <div className='flex flex-col md:flex-row'>
          <div className='md:w-1/2'>
            <Image
              src='https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/5b0981ff-45f8-40c3-9372-32430a62aaea/dunk-high-womens-shoes-LwCxXJ.png'
              alt={data.name}
              width={500}
              height={500}
              className='rounded-lg'
            />
          </div>
          <div className='md:w-1/2 md:pl-8 mt-4 md:mt-0'>
            <h3 className='mb-3 text-3xl font-semibold text-white'>{data.name}</h3>
            <p className='m-0 text-lg text-gray-300 font-bold'>${data.price}</p>
            <p className='mt-2 text-sm text-gray-400'>{data.description}</p>
            <span className='inline-block mt-3 px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded'>
              {data.category}
            </span>
            <div className='mt-3 flex items-center'>
              <div className='flex items-center'>
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar key={index} className={`text-yellow-400`} />
                ))}
              </div>
              <span className='ml-2 text-sm text-gray-400'>({data.numReviews} reviews)</span>
            </div>
            <div className='mt-3 text-sm text-gray-400'>
              <p>Stock: {data.countInStock}</p>
            </div>
          </div>
        </div>
      </div>

      <SimilarProducts currentProduct={data} />
    </div>
  );
};

export default productDetail;
