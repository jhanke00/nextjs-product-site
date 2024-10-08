import React, { useEffect, useState } from 'react';
import useDebouncedValue from './useDebouncedValue'; // Import the custom hook

interface FiltersSidebarProps {
  ratingFilter: number;
  setRatingFilter: React.Dispatch<React.SetStateAction<number>>;
  priceRange: { min: number; max: number };
  setPriceRange: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>;
  categoryFilter: string;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  categories: string[];
}

export default function FiltersSidebar({
  ratingFilter,
  setRatingFilter,
  priceRange,
  setPriceRange,
  categoryFilter,
  setCategoryFilter,
  query,
  setQuery,
  categories,
}: FiltersSidebarProps) {
  // Internal state to track input changes before debouncing
  const [queryInput, setQueryInput] = useState(query);
  const [ratingInput, setRatingInput] = useState(ratingFilter);
  const [minPriceInput, setMinPriceInput] = useState(priceRange.min);
  const [maxPriceInput, setMaxPriceInput] = useState(priceRange.max);
  const [categoryInput, setCategoryInput] = useState(categoryFilter);

  const debouncedQuery = useDebouncedValue(queryInput);
  const debouncedRating = useDebouncedValue(ratingInput);
  const debouncedMinPrice = useDebouncedValue(minPriceInput);
  const debouncedMaxPrice = useDebouncedValue(maxPriceInput);
  const debouncedCategory = useDebouncedValue(categoryInput);

  useEffect(() => {
    if (debouncedQuery) setQuery(debouncedQuery);
  }, [debouncedQuery, setQuery]);

  useEffect(() => {
    if (debouncedRating) setRatingFilter(debouncedRating);
  }, [debouncedRating, setRatingFilter]);

  useEffect(() => {
    const min = debouncedMinPrice || 0;
    const max = debouncedMaxPrice || Number.MAX_SAFE_INTEGER;

    setPriceRange({ min, max });
  }, [debouncedMinPrice, debouncedMaxPrice, setPriceRange]);

  useEffect(() => {
    if (debouncedCategory) setCategoryFilter(debouncedCategory);
  }, [debouncedCategory, setCategoryFilter]);

  return (
    <aside className='w-64 h-auto border-r-2 pr-4'>
      <div className='mb-4'>
        <h4 className='font-bold'>Rating</h4>
        <input
          style={{ color: 'black' }}
          type='range'
          min='0'
          max='5'
          step='1'
          value={ratingInput}
          onChange={(e) => setRatingInput(Number(e.target.value))}
        />
        <span>{ratingFilter} Stars</span>
      </div>

      <div className='mb-4'>
        <h4 className='font-bold'>Product Name</h4>
        <input value={queryInput} onChange={(e) => setQueryInput(e.target.value)} style={{ color: 'black' }} />
      </div>

      <div className='mb-4'>
        <h4 className='font-bold'>Price</h4>
        <div className='flex items-start gap-2 flex-col w-16'>
          <label className='flex gap-2'>
            Min:
            <input
              style={{ color: 'black' }}
              type='number'
              name='min'
              value={minPriceInput}
              onChange={(e) => setMinPriceInput(Number(e.target.value))}
              className='border p-1 w-20'
              placeholder='Min price'
            />
          </label>
          <label className='flex gap-2'>
            Max:
            <input
              style={{ color: 'black' }}
              type='number'
              name='max'
              value={maxPriceInput}
              onChange={(e) => setMaxPriceInput(Number(e.target.value))}
              className='border p-1 w-20'
              placeholder='Max price'
            />
          </label>
        </div>
      </div>

      <div className='mb-4'>
        <h4 className='font-bold'>Category</h4>
        <select style={{ color: 'black' }} value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)}>
          <option value=''>All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
