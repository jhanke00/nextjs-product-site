'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/src/components/productSearch/ProductCard';

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
            <div className='flex flex-wrap -mx-3 mb-2'>
              <div className='w-full md:w-1/6 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-white-700 text-xs font-bold mb-2'
                  htmlFor='grid-city'
                >
                  Category
                </label>
                <div className='relative'>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"'
                  >
                    <option value=''>All Categories</option>
                    <option value='Games'>Games</option>
                    <option value='Outdoors'>Outdoors</option>
                    <option value='Toys'>Toys</option>
                    <option value='Garden'>Garden</option>
                    <option value='Grocery'>Grocery</option>
                    <option value='Sports'>Sports</option>
                    <option value='Books'>Books</option>
                    <option value='Computers'>Computers</option>
                    <option value='Baby'>Baby</option>
                    {/* Add more category options */}
                  </select>
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                    <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                      <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                  </div>
                </div>
              </div>

              <div className='w-full md:w-1/6 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-white-700 text-xs font-bold mb-2'
                  htmlFor='grid-city'
                >
                  Min Price
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-city'
                  type='number'
                  placeholder='100'
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className='w-full md:w-1/6 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-white-700 text-xs font-bold mb-2'
                  htmlFor='grid-city'
                >
                  Max Price
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-city'
                  type='number'
                  placeholder='500'
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
              <div className='w-full md:w-1/6 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-white-700 text-xs font-bold mb-2'
                  htmlFor='grid-city'
                >
                  Min Reviews
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-city'
                  type='number'
                  placeholder='10'
                  value={minReviews}
                  onChange={(e) => setMinReviews(e.target.value)}
                />
              </div>

              <div className='w-full md:w-1/6 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-white-700 text-xs font-bold mb-2'
                  htmlFor='grid-zip'
                >
                  Min Rating
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-zip'
                  type='number'
                  placeholder='3'
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                />
              </div>

              <div className='w-full md:w-1/6 px-3 mb-6 md:mb-0 flex items-end'>
                <button
                  onClick={handleSearch}
                  value={query}
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-1'
                >
                  Search
                </button>
              </div>
            </div>
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
