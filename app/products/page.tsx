'use client';
import largeData from '@/src/mock/large/products.json';
import smallData from '@/src/mock/small/products.json';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Product } from '@/src/type/products';

const PAGE_SIZE = 20;

export type FilterOptions = {
  categoryOptions: string[];
  priceRange: {
    min: number;
    max: number;
  };
};

export type FilterState = {
  rating: number;
  categories: string[];
  priceRange: { min: number; max: number };
};

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const data = useMemo(() => [...largeData, ...smallData].map((i) => ({ ...i, price: Number(i.price) })), []);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const productData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const [filteredItems, setFilteredItems] = useState(productData.map((i) => ({ ...i, price: Number(i.price) })));

  const [filter, setFilter] = useState<FilterState>({
    categories: [],
    priceRange: { min: 0, max: 0 },
    rating: 0,
  });
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categoryOptions: [],
    priceRange: { min: 0, max: 0 },
  });

  useEffect(() => {
    handleFilterOptionsChange(data);
  }, [data]);

  const handleFilterChange = (items: Product[], filter: FilterState) => {
    const filteredItems = items.filter((item) => {
      if (filter.categories.length > 0 && !filter.categories.includes(item.category)) return false;
      if (filter.priceRange.min > 0 && filter.priceRange.min > item.price) return false;
      if (filter.priceRange.max > 0 && filter.priceRange.max < item.price) return false;
      if (filter.rating > 0 && filter.rating > item.rating) return false;

      return true;
    });
    console.log(filteredItems.length);
    setFilteredItems(filteredItems);
  };

  useEffect(() => {
    handleFilterChange(data, filter);
  }, [filter, data]);

  const handleFilterOptionsChange = (items: Product[]) => {
    const categoryOptions = items
      .map((item) => item.category)
      .filter((value, index, array) => array.indexOf(value) === index)
      .sort((a, b) => a.localeCompare(b));
    const priceRange = items.reduce(
      (acc, item) => {
        if (item.price > acc.max) acc.max = item.price;
        if (item.price < acc.min) acc.max = item.price;

        return acc;
      },
      { min: 0, max: 0 }
    );

    setFilterOptions({
      categoryOptions,
      priceRange,
    });
  };

  const handleChangeCategory = (category: string) => {
    if (filter.categories.includes(category)) {
      setFilter((a) => ({ ...a, categories: a.categories.filter((i) => i !== category) }));
    } else {
      setFilter((a) => ({ ...a, categories: [...a.categories, category] }));
    }
  };

  const handleChangePriceRange = (min: number, max: number) => {
    if (max === filter.priceRange.max) {
      setFilter((a) => ({ ...a, priceRange: { ...a.priceRange, min: min } }));
    } else {
      setFilter((a) => ({ ...a, priceRange: { ...a.priceRange, max: max } }));
    }
  };

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <div>
        <div className='flex gap-2'>
          {filterOptions.categoryOptions.map((op) => (
            <div key={op}>
              <button
                onClick={() => handleChangeCategory(op)}
                className={`${filter.categories.includes(op) ? 'bg-purple-700' : 'bg-gray-500'} rounded-md p-2`}
              >
                {op}
              </button>
            </div>
          ))}
        </div>
        <input type='range' min={filterOptions.priceRange.min} max={filterOptions.priceRange.max}></input>
        {filterOptions.priceRange.min}- {filterOptions.priceRange.max}
      </div>

      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <div className='grid lg:max-w-5xl lg:w-full lg:grid-cols-2 lg:text-left'>
          {filteredItems.map((product) => (
            <div
              key={product.id}
              className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
            >
              <Link href={`/products/${product.id}`}>
                <h3 className={`mb-3 text-2xl font-semibold`}>{product.name}</h3>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Price: {product.price}</p>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Description: {product.description}</p>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Category: {product.category}</p>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Rating: {product.rating}</p>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Reviews: {product.numReviews}</p>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Stock: {product.countInStock}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-around w-full border-t-2 pt-4'>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </main>
  );
}
