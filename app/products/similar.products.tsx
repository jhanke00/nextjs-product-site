import { Product } from '@type/products';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import { getSimilarProduct } from '@/src/services/products/get.similar.product';
import { Loading } from '@/src/components/Loading';

interface SimilarProductsProps {
  currentProduct: Product;
}

function SimilarProducts({ currentProduct }: SimilarProductsProps) {
  const { data, isLoading } = getSimilarProduct({ productId: currentProduct.id });

  if (isLoading) {
    return <Loading />;
  }

  if (!data || !data.length) {
    return <p>Not found similar products</p>;
  }

  return (
    <div className='mt-8'>
      <h2 className='text-2xl font-semibold text-white mb-4'>You may also like</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
        {data.map((product) => (
          <div
            key={product.id}
            className='group p-5 rounded-lg shadow-lg overflow-hidden border border-gray-700 bg-gray-800 transition-colors duration-300 hover:bg-gray-700'
          >
            <Link href={`/products/${product.id}`}>
              <div className='flex flex-col md:flex-row'>
                <div className='md:w-1/2'>
                  <Image
                    src='https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/5b0981ff-45f8-40c3-9372-32430a62aaea/dunk-high-womens-shoes-LwCxXJ.png'
                    alt={product.name}
                    width={200}
                    height={200}
                    className='rounded-lg'
                  />
                </div>
                <div className='md:w-1/2 mt-4 md:mt-0'>
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
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimilarProducts;
