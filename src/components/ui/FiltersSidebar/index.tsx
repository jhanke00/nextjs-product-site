import React from 'react';

interface FiltersSidebarProps {
  ratingFilter: number;
  setRatingFilter: React.Dispatch<React.SetStateAction<number>>;
  priceRange: { min: number; max: number };
  setPriceRange: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>;
  categoryFilter: string;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
  categories: string[];
}

export default function FiltersSidebar({
  ratingFilter,
  setRatingFilter,
  priceRange,
  setPriceRange,
  categoryFilter,
  setCategoryFilter,
  categories,
}: FiltersSidebarProps) {
  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPriceRange((prevRange) => ({
      ...prevRange,
      [name]: Number(value),
    }));
  };

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
          value={ratingFilter}
          onChange={(e) => setRatingFilter(Number(e.target.value))}
        />
        <span>{ratingFilter} Stars</span>
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
              value={priceRange.min}
              onChange={handlePriceInputChange}
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
              value={priceRange.max}
              onChange={handlePriceInputChange}
              className='border p-1 w-20'
              placeholder='Max price'
            />
          </label>
        </div>
      </div>

      <div className='mb-4'>
        <h4 className='font-bold'>Category</h4>
        <select style={{ color: 'black' }} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
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
