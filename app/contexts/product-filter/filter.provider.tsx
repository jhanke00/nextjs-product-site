import { ReactNode, useState } from 'react';
import FilterContext from './filter.context';

const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [ratingFilter, setRatingFilter] = useState(0);
  const [priceFilter, setPriceFilter] = useState<[number, number]>([0, 1000]);
  const [categoryFilter, setCategoryFilter] = useState('');

  return (
    <FilterContext.Provider
      value={{
        ratingFilter,
        setRatingFilter,
        priceFilter,
        setPriceFilter,
        categoryFilter,
        setCategoryFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
