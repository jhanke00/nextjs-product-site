import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { createQueryString } from '../utils/createQueryString';

interface ValueFilterProps {
  id: string;
  label: string;
  options: string[];
}

export function ValueFilter(props: ValueFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const param = searchParams?.get(props.id);

  const onInputClick = (val: string) => {
    if (searchParams) {
      router.push(pathname + '?' + createQueryString(searchParams, props.id, val));
    }
  };

  return (
    <section className='overflow-scroll lg:overflow-hidden'>
      <h2 className='font-semibold text-gray-200'>{props.label}</h2>
      <div className='m-2 flex flex-row overflow-x-scroll lg:overflow-x-hidden flex-wrap lg:flex-col'>
        {props.options.map((option) => (
          <label
            className='flex flex-row cursor-pointer px-1 lg:mr-auto'
            key={option}
            onClick={() => onInputClick(option)}
          >
            <input readOnly className='mr-2' type='checkbox' name={option} value={option} checked={param === option} />
            <p className={`text-sm opacity-50 text-gray-100`}>{option}</p>
          </label>
        ))}
      </div>
    </section>
  );
}
