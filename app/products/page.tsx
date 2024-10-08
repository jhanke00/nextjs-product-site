/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import FiltersSidebar from '@/src/components/ui/FiltersSidebar';
import Pagination from '@/src/components/ui/Pagination';
import ProductsList from '@/src/components/ui/ProductList';
import { paginatedProducts } from '@/src/type/products';
import { useState, useEffect } from 'react';

const PAGE_SIZE = 20;
const DATASET = 'large';

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [categoryFilter, setCategoryFilter] = useState('');
  const [query, setQuery] = useState('');
  const [data, setData] = useState<paginatedProducts>(); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to handle loading

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/${DATASET}/products?page=${currentPage}&productsPerPage=${PAGE_SIZE}&query=${query}&category=${categoryFilter}&minPrice=${priceRange.min}&maxPrice=${priceRange.max}&rating=${ratingFilter}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('Result:', result);
      setData(result); // Set the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    currentPage === 1 ? fetchData() : setCurrentPage(1);
  }, [query, categoryFilter, ratingFilter, priceRange]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    setLoading(false);
  }, [data]);

  const nextPage = () => {
    setLoading(true);
    setCurrentPage((prev) => Math.min(prev + 1, data?.pages || 1));
  };

  const prevPage = () => {
    setLoading(true);
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <main className='flex min-h-screen p-24'>
      <FiltersSidebar
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={Array.from(new Set(data?.products.map((product) => product.category)) || []).sort()}
        setQuery={setQuery}
        query={query}
      />
      <section className='flex-1 pl-8'>
        <ProductsList products={data.products} loading={loading} />
        {data.products.length > 0 && data && (
          <Pagination currentPage={data.page} totalPages={data.pages} onNext={nextPage} onPrev={prevPage} />
        )}
      </section>
    </main>
  );
}
