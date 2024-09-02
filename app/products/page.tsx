'use client';
import { FilterProvider } from '@/app/contexts/product-filter';
import FilterSidebar from './filter.sidebar';
import ProductList from '@/app/products/list';
import { Suspense } from 'react';

export default function Products() {
  return (
    <Suspense>
      <FilterProvider>
        <main className='flex min-h-screen flex-col items-center p-24'>
          <div className='flex w-full'>
            <aside className='w-1/4 px-4'>
              <FilterSidebar />
            </aside>
            <ProductList />
          </div>
        </main>
      </FilterProvider>
    </Suspense>
  );
}
