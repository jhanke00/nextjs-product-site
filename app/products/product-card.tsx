import { Product } from '@/src/type/products';
import Link from 'next/link';
import { Star } from 'phosphor-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      key={product.id}
      className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
    >
      <Link href={`/products/${product.id}`} className='flex flex-col'>
        <div className='flex items-center justify-between'>
          <h3 className={`text-2xl font-semibold`}>{product.name}</h3>
          <p className={`max-w-[30ch] text-sm opacity-80 flex gap-1 items-center`}>
            <Star className='h-5 w-5 text-black' />
            {product.rating.toFixed(1)} ({product.numReviews})
          </p>
        </div>

        <p className={`mt-3 max-w-[60ch] text-sm opacity-70 min-h-16`}>{product.description}</p>

        <p className={`mt-3 max-w-[30ch] text-2xl font-bold opacity-80`}>${product.price}</p>

        <div className='mt-3 flex items-center justify-between'>
          <p className={`max-w-[30ch] text-sm opacity-90`}>Category: {product.category}</p>
          <p className={`max-w-[30ch] text-sm opacity-90`}>In stock: {product.countInStock}</p>
        </div>
      </Link>
    </div>
  );
}
