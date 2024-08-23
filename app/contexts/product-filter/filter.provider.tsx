import { ReactNode, useCallback, useEffect, useState } from 'react';
import FilterContext from './filter.context';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type QueryParams = Record<string, string>;

const removeEmptyProperties = (obj: QueryParams): QueryParams => {
  return Object.entries(obj)
    .filter(([_, value]) => {
      // Define what constitutes an "empty" value
      return value !== undefined && value !== null && value !== '' && value.length !== 0;
    })
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as QueryParams);
};

const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [ratingFilter, setRatingFilter] = useState(0);
  const [priceFilter, setPriceFilter] = useState<[number, number]>([0, 1000]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams!.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const query = {
      ratingFilter: ratingFilter.toString(),
      priceFilter: priceFilter.join('-'),
      categoryFilter,
      searchFilter,
    };

    const cleanerQuery = removeEmptyProperties(query);
    const params = new URLSearchParams(cleanerQuery).toString();

    router.push(pathName + `?${params}`);
  }, [ratingFilter, priceFilter, categoryFilter, searchFilter]);

  useEffect(() => {
    const rating = searchParams!.get('ratingFilter');
    const priceRange = searchParams!.get('priceFilter');
    const category = searchParams!.get('categoryFilter');
    const search = searchParams!.get('searchFilter');

    if (rating) setRatingFilter(Number(rating));
    if (priceRange) setPriceFilter(priceRange!.split('-').map(Number) as [number, number]);
    if (category) setCategoryFilter(category!);
    if (search) setSearchFilter(search!);

    console.log('useEffect', rating, priceRange, category, search);
  }, []);

  return (
    <FilterContext.Provider
      value={{
        ratingFilter,
        setRatingFilter,
        priceFilter,
        setPriceFilter,
        categoryFilter,
        setCategoryFilter,
        searchFilter,
        setSearchFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
