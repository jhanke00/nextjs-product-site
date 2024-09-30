import { Product } from '@/src/type/products';
import ProductCard from './ProductCard';
import LoadingSpinner from '../LoadingSpinner';
import { useEffect } from 'react';

interface ProductsListProps {
  products: Product[];
  loading: boolean;
}

export default function ProductsList({ products, loading }: ProductsListProps) {
  return (
    <div className='relative z-10 max-w-5xl w-full font-mono text-sm min-h-screen '>
      {products.length > 0 ? (
        <div className='grid lg:max-w-5xl lg:w-full lg:grid-cols-2 lg:text-left'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className='text-lg text-gray-500'>No products found based on the selected filters.</p>
      )}

      {loading && <LoadingSpinner />}
    </div>
  );
}
