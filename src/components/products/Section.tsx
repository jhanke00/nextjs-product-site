'use client';

import { useEffect, useState } from 'react';
import { type Product } from '@/src/type/products';
import Search from '@components/products/Search';
import Filters from '@/src/components/products/Filters';
import List from '@components/products/List';

type Props = {
  products: Product[];
  categories: string[];
  priceRange: readonly [number, number];
  params: Partial<{
    search: string;
    category: string;
    minPrice: number;
    maxPrice: number;
    topRated: boolean;
    withReviews: boolean;
    inStock: boolean;
  }>;
};

export default function Section({ products, categories, priceRange, params }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(false);
  }, [products]);

  return (
    <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col'>
      <div className='flex flex-wrap justify-start w-full border-b-2 mb-2'>
        <Search params={params} onChange={() => setIsLoading(true)} />
        <Filters categories={categories} priceRange={priceRange} params={params} onChange={() => setIsLoading(true)} />
      </div>
      <List products={products} isLoading={isLoading} />
    </div>
  );
}
