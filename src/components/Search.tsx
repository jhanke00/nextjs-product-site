import { useState } from 'react';
export default function Search({ categories, handleSearchProducts, setReset }: any | []) {
  const [searchProducts, setSearchProducts] = useState('');
  const [searchByCategory, setSearchByCateogry] = useState('');
  const handleCategories = (e: any) => {
    setSearchByCateogry(e.target.value);
  };
  const handleSearch = () => {
    setReset(false);
    handleSearchProducts({ searchProducts, searchByCategory });
  };
  const handleReset = () => {
    setReset(true);
    setSearchProducts('');
    setSearchByCateogry('');
  };

  return (
    <div className='flex items-center gap-2'>
      <input
        type='text'
        placeholder='Search Products...'
        className='rounded-md text-sm p-1'
        onChange={(e) => setSearchProducts(e.target.value)}
        value={searchProducts}
      />
      <select className='rounded-md text-sm p-1' value={searchByCategory} onChange={handleCategories}>
        <option value=''>All Categories</option>
        {categories?.map((category: string, idx: number) => {
          return (
            <option key={idx} id={category} value={category}>
              {category}
            </option>
          );
        })}
      </select>
      <button
        className='flex justify-center items-center w-[70px] bg-blue-500 rounded-md text-white text-sm p-1'
        onClick={handleSearch}
      >
        Search
      </button>
      <button
        className='flex justify-center items-center w-[70px] bg-gray-400 rounded-md text-black text-sm p-1'
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
}
