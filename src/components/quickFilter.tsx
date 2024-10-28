import { useEffect, useState } from 'react';
import { RangeFilter } from './rangeFilter';
import { ValueFilter } from './valueFilter';
import { useRouter } from 'next/navigation';

export function QuickFilter() {
  const router = useRouter();
  const [ratingOptions, setRatingOptions] = useState<string[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);

  useEffect(() => {
    fetch('api/quickFilter')
      .then((res) => res.json())
      .then((data) => {
        setRatingOptions(data.rating);
        setCategoryOptions(data.category);
      });
  }, []);

  const clearAction = () => {
    router.push('/products');
  };

  return (
    <section className='lg:block lg:w-2/5 self-start border rounded-lg overflow-x-scroll lg:overflow-x-hidden p-4 m-4 appearance-none'>
      <span className='text-2xl font-semibold '>Quick Filters</span>
      <div className='flex flex-col h-full justify-evenly py-2'>
        <RangeFilter id='price' label='Price' />
        <ValueFilter options={ratingOptions} label='Ratings' id='rating' />
        <ValueFilter options={categoryOptions} label='Categories' id='category' />
      </div>
      <button
        type='reset'
        className='bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'
        onClick={clearAction}
      >
        Reset
      </button>
    </section>
  );
}
