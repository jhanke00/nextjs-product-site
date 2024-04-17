'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/src/components/productSearch/ProductCard';
import FilterSection from '@/src/components/productSearch/FilterSection';

export default function ProductSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minReviews, setMinReviews] = useState('');
  const [minRating, setMinRating] = useState('');

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    if (searchQuery.length >= 3) {
      setCurrentPage(1);
      const response = await fetch(
        `/api/search?query=${query}&page=1&category=${category}&minPrice=${Number(minPrice)}&maxPrice=${Number(maxPrice)}&minReviews=${minReviews}&minRating=${minRating}`
      );
      const data = await response.json();
      setResults(data);
    } else {
      setResults([]);
    }

    // Alternatively, debouncing can be used.
  };

  const handleButtonClick = async () => {
    if (query.length >= 3) {
      setCurrentPage(1);
      const response = await fetch(
        `/api/search?query=${query}&page=1&category=${category}&minPrice=${Number(minPrice)}&maxPrice=${Number(maxPrice)}&minReviews=${minReviews}&minRating=${minRating}`
      );
      const data = await response.json();
      setResults(data);
    } else {
      setResults([]);
    }
  };

  const handlePages = async (pageNumber: number) => {
    const response = await fetch(
      `/api/search?query=${query}&page=${pageNumber}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&minReviews=${minReviews}&minRating=${minRating}`
    );
    const data = await response.json();
    setResults(data);
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <main className='flex min-h-screen flex-col items-center w-full lg:p-24 md:p-20 sm:p-10'>
      <h2 className='font-sans text-4xl text-white-800 text-center'>Search Product</h2>

      <input
        type='text'
        placeholder='Start Typing... Please type atleast 3 letters.'
        onChange={handleSearch}
        className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 my-5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
        value={query}
      />

      {results.length === 0 && query != '' ? (
        <div className='flex content-center flex-wrap h-48'>
          {query.length < 3 && <p>Type atleast 3 letters to search products.</p>}

          {query.length >= 3 && <p>No results found for &quot;{query}&quot;. Please try a different search query.</p>}
        </div>
      ) : (
        <>
          {results.length != 0 && (
            <>
              <FilterSection
                handleButtonClick={handleButtonClick}
                category={category}
                setCategory={setCategory}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                minReviews={minReviews}
                setMinReviews={setMinReviews}
                minRating={minRating}
                setMinRating={setMinRating}
              />
            </>
          )}

          <div className='z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex my-10'>
            <div className='grid lg:max-w-5xl lg:w-full lg:grid-cols-3 md:grid-cols-2 lg:text-left'>
              {results.map((product) => (
                <div
                  key={product.id}
                  className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3 p-3'
                >
                  <Link href={`/products/${product.id}`}>
                    <ProductCard product={product} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {results.length !== 0 && (
        <div className='flex justify-around w-full border-t-2 pt-4'>
          <button onClick={() => handlePages(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button onClick={() => handlePages(currentPage + 1)} disabled={results.length < 15}>
            Next
          </button>
        </div>
      )}
    </main>
  );
}
