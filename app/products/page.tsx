'use client';
import React, { useState } from 'react';
import largeData from '@/src/mock/small/products.json';
import Link from 'next/link';

export default function Searchbar() {
  const data = [...largeData];
  const itemList = data.map((product) => product);
  console.log(itemList);
  const [filteredList, setFilteredList] = useState(itemList);

  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value;
    // Create copy of item list
    var updatedList = [...itemList];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // Trigger render with updated values
    setFilteredList(updatedList);
  };

  return (
    <div className='search-text'>
      <div className='left-0 top-0 w-full border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30'>
        <p>Acceptance Criteria</p>
        <p>Need an endpoint that serves the list of products that are available in the mock data.</p>
        <p>Need an endpoint that queries for a single product and returns the information for that product.</p>
        <p>Need an endpoint that returns a list of products that start with a search query.</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        Search: <input id='search-box' onChange={filterBySearch} />
      </div>
      <div className='grid lg:max-w-5xl lg:w-full lg:grid-cols-3 lg:text-left'>
        {filteredList.map((item) => (
          <Link
            href={`/products/${item.id}`}
            className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
          >
            <h3 className={`mb-3 text-2xl font-semibold`}>{item.name}</h3>
            <p>Click here to see product details</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
