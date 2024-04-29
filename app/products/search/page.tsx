'use client';
import ProductsDisplay from '@/src/components/products';
import { useState } from 'react';

const productSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState([]);

  const search = () => {
    fetch(`/api/products/search?term=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        setSearched(true);
        setResults(data);
      });
  };

  return (
    <>
      <div className='grid gap-6 mb-6 md:grid-cols-3'>
        <div className='m-4'>
          <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Search Products</label>
          <input
            type='text'
            id='search-term'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='shirt'
            onChange={(event) => setSearchTerm(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                search();
              }
            }}
            required
          />
        </div>
      </div>
      <main className='flex min-h-screen flex-col lg:grid-cols-2 p-24'>
        {searched && (
          <>
            {results.length > 0 && <ProductsDisplay dataDisplayed={results} />}
            {results.length === 0 && <h4>No Products Found</h4>}
          </>
        )}
      </main>
    </>
  );
};

export default productSearch;
