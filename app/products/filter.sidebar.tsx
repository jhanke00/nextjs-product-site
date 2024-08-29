import largeData from '@mock/large/products.json';
import smallData from '@mock/small/products.json';
import { useFilter } from '@/app/contexts/product-filter';
import { FaStar } from 'react-icons/fa';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { ChangeEvent, useEffect, useState } from 'react';
import { debounce } from 'lodash';

const FilterSidebar = () => {
  const {
    ratingFilter,
    setRatingFilter,
    priceFilter,
    setPriceFilter,
    categoryFilter,
    setCategoryFilter,
    searchFilter,
    setSearchFilter,
    applyFilters,
  } = useFilter();
  const data = [...largeData, ...smallData];
  const [searchInput, setSearchInput] = useState<string>(searchFilter);
  const categories = [...new Set(data.map((product) => product.category))].sort();

  const debouncedSearch = debounce((value: string) => {
    setSearchFilter(value);
  }, 300);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    if (searchFilter !== searchInput) {
      setSearchInput(searchFilter);
    }
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  return (
    <div className='p-4 bg-gray-800 rounded-lg shadow-lg'>
      <div className='mb-6'>
        <input
          type='text'
          placeholder='Search products...'
          value={searchInput}
          onChange={handleSearchChange}
          className='bg-gray-800 text-white border border-gray-600 rounded p-2 w-full focus:outline-none focus:border-blue-500'
        />
      </div>
      <div className='mb-6'>
        <h3 className='text-xl font-semibold text-white mb-2'>Rating</h3>
        <div className='flex items-center'>
          {Array.from({ length: 5 }, (_, index) => (
            <FaStar
              key={index}
              className={`cursor-pointer ${index < ratingFilter ? 'text-yellow-400' : 'text-gray-500'}`}
              onClick={() => setRatingFilter(index + 1)}
            />
          ))}
        </div>
        <div className='flex items-center justify-between mt-2'>
          <span className='text-white'>{ratingFilter} Stars</span>
          <button className='text-sm text-blue-500 hover:underline' onClick={() => setRatingFilter(0)}>
            Clear
          </button>
        </div>
      </div>
      <div className='mb-6'>
        <h3 className='text-xl font-semibold text-white mb-2'>Price</h3>
        <div className='flex flex-col items-center'>
          <Slider
            range
            min={0}
            max={1000}
            value={priceFilter}
            onChange={(value) => setPriceFilter(value as [number, number])}
            styles={{
              track: { backgroundColor: 'yellow' },
              handle: { borderColor: 'yellow' },
              rail: { backgroundColor: 'gray' },
            }}
          />
          <div className='flex justify-between w-full mt-2'>
            <input
              type='number'
              min='0'
              max='1000'
              value={priceFilter[0]}
              onChange={(e) => setPriceFilter([Number(e.target.value), priceFilter[1]])}
              className='bg-gray-800 text-white border border-gray-600 rounded p-2 w-1/2 mr-2'
            />
            <input
              type='number'
              min='0'
              max='1000'
              value={priceFilter[1]}
              onChange={(e) => setPriceFilter([priceFilter[0], Number(e.target.value)])}
              className='bg-gray-800 text-white border border-gray-600 rounded p-2 w-1/2 ml-2'
            />
          </div>
        </div>
      </div>
      <div>
        <h3 className='text-xl font-semibold text-white mb-2'>Category</h3>
        <select
          className='bg-gray-800 text-white border border-gray-600 rounded p-2 w-full'
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value=''>All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className='mt-6'>
        <button
          className='w-full text-white bg-blue-500 border border-blue-500 rounded py-2 px-4'
          onClick={applyFilters}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
