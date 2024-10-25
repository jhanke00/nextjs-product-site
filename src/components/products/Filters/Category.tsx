import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { nonNullishValues } from '@/src/utils/helpers';

type Props = {
  categories: string[];
  params: {
    category?: string;
  };
  onChange: () => void;
};

export default function Filters({ categories, params, onChange }: Props) {
  const router = useRouter();
  const [category, setCategory] = useState(params.category);

  const handleSelectCategory = (selectedCategory: string) => {
    const newParams = new URLSearchParams({
      ...nonNullishValues(params),
      category: selectedCategory,
      page: '1',
    });

    router.push(`/products?${newParams}`);
    onChange();
    setCategory(selectedCategory);
  };

  return (
    <>
      <select
        className='bg-white text-black focus:ring-blue-500 focus:border-blue-500 block h-7 m-2 ml-1 p-1'
        value={category}
        onChange={(e) => handleSelectCategory(e.target.value)}
      >
        <option value=''>All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </>
  );
}
