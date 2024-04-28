'use client';
import ProductComponent from '@/src/components/product';
import { useEffect, useState } from 'react';

const productDetail = ({ params }: { params: { productId: string } }) => {
  const [product, setProduct] = useState(undefined);

  useEffect(() => {
    fetch(`/api/products/${params.productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  return <div className='flex min-h-screen flex-col p-24'>{product && <ProductComponent product={product} />}</div>;
};

export default productDetail;
