import { ReactNode, useCallback, useEffect, useState } from 'react';
import FilterContext from './filter.context';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { removeEmptyProperties } from '@utils/remove.empty.properties';

const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [ratingFilter, setRatingFilter] = useState(0);
  const [priceFilter, setPriceFilter] = useState<[number, number]>([0, 1000]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [filters, setFilters] = useState<{
    rating: number;
    price: [number, number];
    category: string;
    search: string;
    page: number;
  }>({
    rating: ratingFilter,
    price: priceFilter,
    category: categoryFilter,
    search: searchFilter,
    page: currentPage,
  });

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const updateRouter = () => {
    const query = {
      ratingFilter: ratingFilter.toString(),
      priceFilter: priceFilter.join('-'),
      categoryFilter,
      searchFilter,
      page: currentPage.toString(),
    };

    const cleanerQuery = removeEmptyProperties(query);
    const params = new URLSearchParams(cleanerQuery).toString();

    router.push(pathName + `?${params}`);
  };

  useEffect(() => {
    const rating = searchParams!.get('ratingFilter');
    const priceRange = searchParams!.get('priceFilter');
    const category = searchParams!.get('categoryFilter');
    const search = searchParams!.get('searchFilter');
    const page = searchParams!.get('page');

    if (rating) setRatingFilter(Number(rating));
    if (priceRange) setPriceFilter(priceRange!.split('-').map(Number) as [number, number]);
    if (category) setCategoryFilter(category!);
    if (search) setSearchFilter(search!);
    if (currentPage) setCurrentPage(Number(page));
  }, []);

  useEffect(() => {
    applyFilters();
  }, [currentPage]);

  const applyFilters = useCallback(() => {
    setFilters({
      rating: ratingFilter,
      price: priceFilter,
      category: categoryFilter,
      search: searchFilter,
      page: currentPage,
    });
    updateRouter();
  }, [categoryFilter, currentPage, priceFilter, ratingFilter, searchFilter]);

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
        currentPage,
        setCurrentPage,
        applyFilters,
        filters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
