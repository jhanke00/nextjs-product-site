import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import Input from '@components/Input';
import { nonNullishValues } from '@/src/utils/helpers';

type Props = {
  params: {
    search?: string;
  };
  onChange: () => void;
};

export default function Search({ params }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState(params.search);
  const [query] = useDebounce(search, 750);

  useEffect(() => {
    if (query === params.search) return;

    const newParams = new URLSearchParams({
      ...nonNullishValues(params),
      search: query ?? '',
      page: '1',
    });

    router.push(`/products?${newParams}`);
  }, [query]);

  return (
    <>
      <Input inputType='search' value={search} label={'Search:'} handleChange={(e) => setSearch(e.target.value)} />
    </>
  );
}
