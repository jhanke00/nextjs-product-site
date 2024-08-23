import largeData from '@/src/mock/large/products.json';
import smallData from '@/src/mock/small/products.json';
import Image from 'next/image';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import SimilarProducts from '@/app/products/similar.products';
import { Product } from '@type/products';

const productDetail = ({ params }: { params: { productId: string } }) => {
  const data: Product[] = [...largeData, ...smallData] as unknown as Product[];
  const product = data.find((item) => item.id === params.productId);
  if (!product) {
    return <p>Product not Found</p>;
  }

  return (
    <div className='flex min-h-screen flex-col p-8'>
      <div className='max-w-4xl mx-auto p-6 rounded-lg shadow-md border border-gray-700 bg-gray-800'>
        <div className='flex flex-col md:flex-row'>
          <div className='md:w-1/2'>
            <Image
              src='https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/5b0981ff-45f8-40c3-9372-32430a62aaea/dunk-high-womens-shoes-LwCxXJ.png'
              alt={product.name}
              width={500}
              height={500}
              className='rounded-lg'
            />
          </div>
          <div className='md:w-1/2 md:pl-8 mt-4 md:mt-0'>
            <h3 className='mb-3 text-3xl font-semibold text-white'>{product.name}</h3>
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
        </div>
      </div>

      <SimilarProducts products={data} currentProduct={product} />
    </div>
  );
};

export default productDetail;
