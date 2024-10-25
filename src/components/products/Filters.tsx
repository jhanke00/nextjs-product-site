import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { nonNullishValues } from '@/src/utils/helpers';
import Category from './Filters/Category';
import Price from './Filters/Price';
import Toggles from './Filters/Toggles';

import Input from '@components/Input';

type Props = {
  categories: string[];
  priceRange: readonly [number, number];
  params: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    topRated?: boolean;
    withReviews?: boolean;
    inStock?: boolean;
  };
  onChange: () => void;
};

export default function Filters({ categories, priceRange, params, onChange }: Props) {
  return (
    <>
      <Category categories={categories} params={params} onChange={onChange} />
      <Price priceRange={priceRange} params={params} onChange={onChange} />
      <div className='flex flex-col flex-wrap'>
        <Toggles params={params} onChange={onChange} />
      </div>
    </>
  );
}
