'use client';
import ProductComponent from '@/src/components/product';
import ProductsDisplay from '@/src/components/products';
import { useEffect, useState } from 'react';

const productDetail = ({ params }: { params: { productId: string } }) => {
  const [product, setProduct] = useState(undefined);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    fetch(`/api/products/${params.productId}`)
      .then((res) => res.json())
      .then((data: any) => {
        setProduct(data?.product);
        setSimilarProducts(data?.similarProducts);
      });
  }, []);

  return (
    <>
      <div className='flex flex-col m-12'>{product && <ProductComponent product={product} />}</div>
      <h3 className='text-center'>Customers Also Bought:</h3>
      <main className='flex min-h-screen flex-col lg:grid-cols-2 m-12'>
        {similarProducts.length > 0 && <ProductsDisplay dataDisplayed={similarProducts} />}
      </main>
    </>
  );
};

export default productDetail;
