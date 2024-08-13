'use client';
import largeData from '@/src/mock/large/products.json';
import smallData from '@/src/mock/small/products.json';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

const PAGE_SIZE = 20;

export default function Component() {
  const [currentPage, setCurrentPage] = useState(1);
  const data = [...largeData, ...smallData];
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const productData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  const priceRange = useMemo(() => {
    const prices = productData.map((product) => parseFloat(product.price));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    return [minPrice, maxPrice];
  }, [productData]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRange);
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    productData.forEach((product) => {
      uniqueCategories.add(product.category);
    });
    return Array.from(uniqueCategories);
  }, [productData]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const handleRatingChange = (rating: number) => {
    setSelectedRating((prevRatings) => {
      if (prevRatings.includes(rating)) {
        return prevRatings.filter((r) => r !== rating);
      } else {
        return [...prevRatings, rating];
      }
    });
  };
  const handlePriceRangeChange = (range: [number, number]) => {
    setSelectedPriceRange(range);
  };
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevCategories: string[]) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((c) => c !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };
  const filteredProducts = useMemo(() => {
    return productData.filter((product) => {
      if (selectedRating.length > 0 && !selectedRating.includes(Math.floor(product.rating))) {
        return false;
      }
      if (parseFloat(product.price) < selectedPriceRange[0] || parseFloat(product.price) > selectedPriceRange[1]) {
        return false;
      }
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }
      return true;
    });
  }, [priceRange, productData, selectedCategories, selectedRating]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className='grid md:grid-cols-[300px_1fr] gap-8 p-4 md:p-8'>
      <div className='bg-background rounded-lg shadow-sm p-6'>
        <h2 className='text-lg font-semibold mb-4'>Filters</h2>
        <div className='grid gap-6'>
          <div>
            <h3 className='text-base font-medium mb-2'>Rating</h3>
            <div className='grid gap-2'>
              {[0, 1, 2, 3, 4, 5].map((rating) => (
                <div key={rating} className='flex items-center gap-2'>
                  <Checkbox
                    checked={selectedRating.includes(rating)}
                    onCheckedChange={() => handleRatingChange(rating)}
                  />
                  <div className='flex items-center gap-1'>
                    {[...Array(rating)].map((_, i) => (
                      <StarIcon key={i} className='w-4 h-4 fill-yellow-500' />
                    ))}
                    {[...Array(5 - rating)].map((_, i) => (
                      <StarIcon key={i} className='w-4 h-4 fill-gray-300' />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className='text-base font-medium mb-2'>Price</h3>
            <input
              type='range'
              min={priceRange[0]}
              max={priceRange[1]}
              step={10}
              value={selectedPriceRange[1]}
              onChange={(e) => handlePriceRangeChange([priceRange[0], parseInt(e.target.value)])}
              className='w-full'
            />
            <div className='flex justify-between text-sm text-muted-foreground'>
              <span>${selectedPriceRange[0]}</span>
              <span>${selectedPriceRange[1]}</span>
            </div>
          </div>
          <div>
            <h3 className='text-base font-medium mb-2'>Category</h3>
            <div className='grid gap-2'>
              {categories.map((category) => (
                <div key={category} className='flex items-center gap-2'>
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <span>{category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {filteredProducts.map((product) => (
          <div key={product.id} className='bg-background rounded-lg shadow-sm overflow-hidden'>
            <Link href='#' className='block' prefetch={false}>
              <div className='p-4 flex flex-col justify-between'>
                <div>
                  <h3 className='text-lg font-semibold'>{product.name}</h3>
                  <div className='text-sm text-muted-foreground mb-2'>{product.category}</div>
                  <p className='text-sm text-muted-foreground mb-2'>{product.description}</p>
                  <div className='flex items-center gap-2 mb-2'>
                    {[...Array(Math.floor(product.rating))].map((_, i) => (
                      <StarIcon key={i} className='w-5 h-5 fill-primary' />
                    ))}
                    {[...Array(5 - Math.floor(product.rating))].map((_, i) => (
                      <StarIcon key={i} className='w-5 h-5 fill-muted stroke-muted-foreground' />
                    ))}
                    <span className='text-sm text-muted-foreground'>({product.rating})</span>
                  </div>
                </div>
                <div className='flex justify-between items-end mt-4'>
                  <div className='font-semibold'>${product.price}</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className='flex justify-around w-full border-t-2 pt-4'>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

function Checkbox({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: () => void }) {
  return <input type='checkbox' checked={checked} onChange={onCheckedChange} />;
}

interface StarIconProps {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit';
  strokeLinejoin?: 'miter' | 'round' | 'bevel' | 'inherit';
}

function StarIcon(props: StarIconProps) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width={props.width || 24}
      height={props.height || 24}
      viewBox='0 0 24 24'
      fill={props.fill || 'none'}
      stroke={props.stroke || 'currentColor'}
      strokeWidth={props.strokeWidth || 0}
      strokeLinecap={props.strokeLinecap || 'round'}
      strokeLinejoin={props.strokeLinejoin || 'round'}
    >
      <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
    </svg>
  );
}
