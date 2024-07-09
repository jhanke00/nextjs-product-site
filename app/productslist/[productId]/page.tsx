'use client';
import BreadCrumb from '@/src/components/BreadCrumb';
import { Product } from '@/src/type/products/index';
import useDataHook from '@/src/utils/useDataHook';
import { useEffect, useState } from 'react';
export default function Productdetails({ params }: { params: { productId: string } }) {
  const { getLargeProductsList } = useDataHook();
  const [productData, setProductData] = useState({} as Product);

  useEffect(() => {
    const data = getLargeProductsList();
    const filteredData = data.find((product) => product.id === params.productId);
    if (filteredData) {
      setProductData(filteredData as any);
    }
  }, []);

  return (
    <div className='w-full min-h-screen bg-gray-200 p-4'>
      <div>
        <BreadCrumb
          breadcrumbs={[
            { label: 'Home', href: '/' },
            {
              label: 'Products',
              href: '/productslist',
            },
            {
              label: 'Product Details',
              href: `/productslist`,
              active: true,
            },
          ]}
        />
        {productData?.id ? (
          <div className='w-full flex-row items-center '>
            <div className='w-full p-2 bg-[#1E293B] text-white font-semibold text-lg'>{productData?.name}</div>
            <div className='w-full p-2 bg-white text-normal'>{productData?.description}</div>
            <div className='w-full flex items-center justify-between p-2 bg-blue-100'>
              <div>Price</div>
              <div>${productData?.price}</div>
            </div>
            <div className='w-full flex items-center justify-between p-2 bg-white'>
              <div>Category</div>
              <div>{productData?.category}</div>
            </div>
            <div className='w-full flex items-center justify-between p-2 bg-blue-100'>
              <div>Rating</div>
              <div>{productData?.rating}</div>
            </div>
            <div className='w-full flex items-center justify-between p-2 bg-white'>
              <div>Number of Reviews</div>
              <div>{productData?.numReviews}</div>
            </div>
            <div className='w-full flex items-center justify-between p-2 bg-blue-100'>
              <div>Count in Stock</div>
              <div>{productData?.countInStock}</div>
            </div>
          </div>
        ) : (
          <div className='w-full flex-row'>
            <div className='text-xl font-bold text-red-700 pb-2'>Product Details - NOT FOUND</div>
            <div className='text-sm'>The product with ID: {params.productId} was not found.</div>
          </div>
        )}
      </div>
    </div>
  );
}
