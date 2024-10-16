'use client';
import { useState, useEffect } from 'react';

const ProductDetail = ({ params }: { params: { productId: string } }) => {
  const [product, setProduct] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const response = await fetch(`/api/getData`);
        const products = await response.json();

        // Find the product by ID
        const foundProduct = products.find((item: any) => item.id.S === params.productId);
        if (!foundProduct) {
          setError('Product not found');
          setProduct(null);
        } else {
          setProduct(foundProduct);
          setError(null);
        }
      } catch (err) {
        setError('Failed to fetch product');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params.productId]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='flex min-h-screen flex-col p-24'>
      <h1 className='text-2xl font-semibold'>Product Description</h1>
      <h3 className={`mb-3 text-xl `}>{product.name.S}</h3>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Price: {product.price.N}</p>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Description: {product.description.S}</p>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Category: {product.category.S}</p>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Rating: {product.rating.N}</p>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Reviews: {product.numReviews.N}</p>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Stock: {product.countInStock.N}</p>
    </div>
  );
};

export default ProductDetail;
