import React, { ChangeEvent } from 'react';

interface FilterSectionProps {
  handleButtonClick: () => void;
  category: string;
  setCategory: (category: string) => void;
  minPrice: string;
  setMinPrice: (minPrice: string) => void;
  maxPrice: string;
  setMaxPrice: (maxPrice: string) => void;
  minReviews: string;
  setMinReviews: (minReviews: string) => void;
  minRating: string;
  setMinRating: (minRating: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  handleButtonClick,
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minReviews,
  setMinReviews,
  minRating,
  setMinRating,
}) => {
  return (
    <div className='flex flex-wrap -mx-3 mb-2 npa-custom'>
      <div className='w-full md:w-1/6 px-3 mb-6 md:mb-0'>
        <label className='block uppercase tracking-wide text-white-700 text-xs font-bold mb-2' htmlFor='grid-city'>
          Category
        </label>
        <div className='relative'>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
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
        <label className='block uppercase tracking-wide text-white-700 text-xs font-bold mb-2' htmlFor='grid-city'>
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
        <label className='block uppercase tracking-wide text-white-700 text-xs font-bold mb-2' htmlFor='grid-city'>
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
        <label className='block uppercase tracking-wide text-white-700 text-xs font-bold mb-2' htmlFor='grid-city'>
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
        <label className='block uppercase tracking-wide text-white-700 text-xs font-bold mb-2' htmlFor='grid-zip'>
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
          onClick={handleButtonClick}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-1'
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
