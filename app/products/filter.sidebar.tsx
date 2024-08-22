import largeData from '@mock/large/products.json';
import smallData from '@mock/small/products.json';
import { useFilter } from '@/app/contexts/product-filter';

const FilterSidebar = () => {
  const { ratingFilter, setRatingFilter, priceFilter, setPriceFilter, categoryFilter, setCategoryFilter } = useFilter();
  const data = [...largeData, ...smallData];
  const categories = [...new Set(data.map((product) => product.category))].sort();

  return (
    <div>
      <div>
        <h3>Rating</h3>
        <input
          type='range'
          min='0'
          max='5'
          value={ratingFilter}
          onChange={(e) => setRatingFilter(Number(e.target.value))}
        />
        <span>{ratingFilter} Stars</span>
      </div>
      <div>
        <h3>Price</h3>
        <input
          type='range'
          min='0'
          max='1000'
          value={priceFilter[0]}
          onChange={(e) => setPriceFilter([Number(e.target.value), priceFilter[1]])}
        />
        <input
          type='range'
          min='0'
          max='1000'
          value={priceFilter[1]}
          onChange={(e) => setPriceFilter([priceFilter[0], Number(e.target.value)])}
        />
        <span>
          ${priceFilter[0]} - ${priceFilter[1]}
        </span>
      </div>
      <div>
        <h3>Category</h3>
        <select
          className='bg-gray-800 text-white border border-gray-600 rounded p-2'
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value=''>All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;
