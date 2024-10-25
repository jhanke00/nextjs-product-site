import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { nonNullishValues } from '@/src/utils/helpers';
import Input from '@components/Input';

type Props = {
  priceRange: readonly [number, number];
  params: {
    minPrice?: number;
    maxPrice?: number;
  };
  onChange: () => void;
};

export default function Filters({ priceRange, params, onChange }: Props) {
  const [minPrice, maxPrice] = priceRange;
  const router = useRouter();

  const [priceFilter, setPriceFilter] = useState([params.minPrice, params.maxPrice]);
  const [priceQuery] = useDebounce(priceFilter, 750);

  useEffect(() => {
    const [min, max] = priceQuery;

    if (min === params.minPrice && max === params.maxPrice) return;

    const newParams = new URLSearchParams({
      ...nonNullishValues(params),
      ...(!!min && { minPrice: min + '' }),
      ...(!!max && { maxPrice: max + '' }),
      page: '1',
    });

    router.push(`/products?${newParams}`);
    onChange();
  }, [priceQuery, params, onChange, router]);

  return (
    <>
      <Input
        inputType='number'
        value={priceFilter.at(0) ?? minPrice}
        label='Min price:'
        max={maxPrice}
        min={minPrice}
        handleChange={(e) => setPriceFilter(([_, max]) => [parseInt(e.target.value), max])}
      />
      <Input
        inputType='number'
        value={priceFilter.at(1) ?? maxPrice}
        label='Max price:'
        max={maxPrice}
        min={minPrice}
        handleChange={(e) => setPriceFilter(([min, _]) => [min, parseInt(e.target.value)])}
      />
    </>
  );
}
