import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, Suspense, useEffect, useState } from 'react';

interface RangeFilterProps {
  id: string;
  label: string;
}

export function RangeFilter(props: RangeFilterProps) {
  return (
    <Suspense>
      <Filter {...props} />
    </Suspense>
  );
}

export function Filter(props: RangeFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const minField = `min${props.id}`;
  const maxField = `max${props.id}`;
  // Track min and max ranges as state
  const [minRange, setMinRange] = useState(searchParams?.get(minField) || '');
  const [maxRange, setMaxRange] = useState(searchParams?.get(maxField) || '');

  // Only update URL parameters if minRange or maxRange have changed
  const updateUrlParams = (newMin?: string, newMax?: string) => {
    const params = new URLSearchParams(searchParams?.toString());

    if (newMin !== minRange) {
      newMin ? params.set(minField, newMin) : params.delete(minField);
    }

    if (newMax !== maxRange) {
      newMax ? params.set(maxField, newMax) : params.delete(maxField);
    }

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const handleMinRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const min = e.target.value;
    setMinRange(min);
    updateUrlParams(min, maxRange);
  };

  const handleMaxRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const max = e.target.value;
    setMaxRange(max);
    updateUrlParams(minRange, max);
  };

  return (
    <section className='overflow-x-auto lg:overflow-x-hidden'>
      <h2 className='font-semibold opacity-50'>{props.label}</h2>
      <div className='text-sm flex flex-col sm:flex-row'>
        <label className='text-gray-500 my-2 mr-2'>
          <input
            className='p-1 rounded w-24'
            type='number'
            value={minRange}
            placeholder={`Min ${props.label}`}
            onChange={handleMinRangeChange}
          />
        </label>
        <label className='text-sm text-gray-500 my-2 mr-2'>
          <input
            className='p-1 rounded w-24'
            type='number'
            value={maxRange}
            placeholder={`Max ${props.label}`}
            onChange={handleMaxRangeChange}
          />
        </label>
      </div>
    </section>
  );
}
