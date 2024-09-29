'use client';
import FiltersSidebar from '@/src/components/ui/FiltersSidebar';
import Pagination from '@/src/components/ui/Pagination';
import ProductsList from '@/src/components/ui/ProductList';
import largeData from '@/src/mock/large/products.json';
import smallData from '@/src/mock/small/products.json';
import { useState, useEffect } from 'react';

const PAGE_SIZE = 20;

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [categoryFilter, setCategoryFilter] = useState('');

  const data = [...largeData, ...smallData];
  const categories = Array.from(new Set(data.map((product) => product.category))).sort();

  // Filtered Data
  const filteredData = data.filter((product) => {
    return (
      Math.round(product.rating) >= ratingFilter &&
      Number(product.price) >= priceRange.min &&
      Number(product.price) <= priceRange.max &&
      (categoryFilter === '' || product.category === categoryFilter)
    );
  });

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const productData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <main className='flex min-h-screen p-24'>
      <FiltersSidebar
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />
      <section className='flex-1 pl-8'>
        <ProductsList products={productData} />
        {productData.length > 0 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onNext={nextPage} onPrev={prevPage} />
        )}
      </section>
    </main>
  );
}
