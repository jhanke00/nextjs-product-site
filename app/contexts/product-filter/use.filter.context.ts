import { useContext } from 'react';
import FilterContext from '@/app/contexts/product-filter/filter.context';

const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};

export default useFilterContext;
