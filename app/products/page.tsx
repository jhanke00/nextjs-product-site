'use client';

import ProductCard from '@/src/components/product-card';
import { ProductPagination } from '@/src/components/product-pagination';
import ScrollToTop from '@/src/components/scroll-to-top';
import largeData from '@/src/mock/large/products.json';
import smallData from '@/src/mock/small/products.json';
import { useState } from 'react';

const PAGE_SIZE = 20;

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const data = [...largeData, ...smallData];
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const productData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className='w-full container mx-auto px-4 dark min-h-screen'>
      <ProductPagination initialPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

      <div className='flex flex-wrap justify-center gap-4 py-4'>
        {productData.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

      <ScrollToTop />
    </main>
  );
}
