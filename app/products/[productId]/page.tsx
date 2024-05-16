'use client';
import { Product } from '@/src/type/products';
import { useEffect, useState } from 'react';

const ProductDetail = ({ params }: { params: { productId: string } }) => {
  const [product, setProduct] = useState<Partial<Product>>({});

  useEffect(() => {
    fetch(`/api/products/${params.productId}`)
      .then((res) => {
        if (res.status !== 200) {
        }
        return res.json();
      })
      .then(setProduct);
  }, [params.productId]);

  return (
    <div className='flex min-h-screen flex-col p-24'>
      <h1 className='text-2xl font-semibold'>Product Description</h1>
      <h3 className={`mb-3 text-xl `}>{product.name}</h3>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Price: {product.price}</p>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Description: {product.description}</p>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Category: {product.category}</p>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Rating: {product.rating}</p>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Reviews: {product.numReviews}</p>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Stock: {product.countInStock}</p>
    </div>
  );
};

export default ProductDetail;
