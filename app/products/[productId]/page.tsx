'use client';
import largeData from '@/src/mock/large/products.json';
import smallData from '@/src/mock/small/products.json';
import { ArrowLeft, Star } from 'phosphor-react';
import { ProductCard } from '../product-card';
import { useRouter } from 'next/navigation';

export default function ProductDetails({ params }: { params: { productId: string } }) {
  const data = [...largeData, ...smallData];

  const product = data.find((item) => item.id === params.productId);

  const router = useRouter();

  function handleGoBack() {
    router.back();
  }

  if (!product) {
    return (
      <div className='flex min-h-screen flex-col p-24 items-center justify-center'>
        <p className='text-2xl font-semibold'>Product not found!</p>;
        <button
          type='button'
          className='py-2 rounded-md flex items-center gap-2 pointer hover:underline'
          onClick={handleGoBack}
        >
          <ArrowLeft className='text-black h-4 w-4' /> See all products
        </button>
      </div>
    );
  }

  const productsFromSameCategory = data
    .filter((item) => item.id !== params.productId && item.category === product?.category)
    .slice(0, 6);

  return (
    <div className='flex min-h-screen flex-col p-24'>
      <div className='w-full '>
        <button onClick={handleGoBack} type='button'>
          <ArrowLeft className='h-6 w-6 text-black' />
        </button>
      </div>

      <div className='mt-5 max-w-[500px] mx-auto'>
        <h3 className={`text-2xl font-semibold`}>{product.name}</h3>

        <p className={`mt-5 max-w-[30ch] text-sm opacity-80 flex gap-1 items-center`}>
          <Star className='h-5 w-5 text-black' />
          {product.rating.toFixed(1)} ({product.numReviews})
        </p>

        <p className={`mt-5 max-w-[60ch] text-sm opacity-70 min-h-16 text-base`}>{product.description}</p>

        <p className={`mt-5 max-w-[30ch] text-2xl font-bold opacity-80`}>${product.price}</p>

        <div className='mt-5 flex items-center justify-between'>
          <p className={`max-w-[30ch] text-sm opacity-90`}>Category: {product.category}</p>
          <p className={`max-w-[30ch] text-sm opacity-90`}>In stock: {product.countInStock}</p>
        </div>
      </div>

      <div className='mt-20 w-full'>
        <h2 className='text-2xl font-semibold text-center'>You may also like</h2>
        <div className='mt-5 mx-auto grid lg:max-w-5xl lg:w-full lg:grid-cols-2 lg:text-left gap-5'>
          {productsFromSameCategory.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                price: Number(product.price),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
