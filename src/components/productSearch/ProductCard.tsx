import React from 'react';
import { Rating } from 'react-simple-star-rating';

interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  countInStock: number;
  rating: number;
  numReviews: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <>
      <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>{product.name}</h3>

      <p className='text-base font-normal leading-tight text-gray-500 dark:text-gray-400 my-3'>{product.description}</p>

      <p className='w-fit bg-blue-100 text-blue-800 text-xs font-semibold px-5 py-3 rounded dark:bg-blue-200 dark:text-blue-800'>
        {product.category}
      </p>

      <div className='flex items-center my-5'>
        <svg
          className='flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 20 20'
        >
          <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
        </svg>
        <span className='text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-1'>
          {product.countInStock} in stock
        </span>
      </div>

      <div className='my-5'>
        <Rating
          initialValue={product.rating}
          size={20}
          readonly={true}
          SVGclassName={`inline-block`}
          allowFraction={true}
        />
        {product.rating && (
          <span className='bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3'>
            {' '}
            {product.rating.toFixed(2)} ( {product.numReviews} reviews )
          </span>
        )}
      </div>
      <div className='flex items-center justify-between sticky top-[100vh]'>
        <span className='text-3xl font-bold text-gray-900 dark:text-white'>${product.price}</span>
        <span className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
          View Product
        </span>
      </div>
    </>
  );
};

export default ProductCard;
