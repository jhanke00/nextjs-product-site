import { Item, SummaryProps } from '../../type/orders';
import React from 'react';

export const Summary = React.memo(({ data }: SummaryProps) => {
  const { name, price, quantity, id } = data;
  return (
    <div className='p-6 border-b border-gray-200'>
      <div className='flex items-center justify-between'>
        <p className='font-normal text-lg leading-8 text-gray-400'>{name}</p>
        <p className='font-medium text-lg leading-8 text-white-900'>&#8377; {price.toLocaleString()}</p>
      </div>
      <div className='flex items-center justify-between'>
        <p className='font-normal text-lg leading-8 text-gray-400'>Quantity</p>
        <p className='font-medium text-lg leading-8 text-white-600'>{quantity}</p>
      </div>
      <div className='flex items-center justify-between'>
        <p className='font-normal text-lg leading-8 text-gray-400'>Total</p>
        <p className='font-medium text-lg leading-8 text-white-600'>&#8377;{(price * quantity).toLocaleString()}</p>
      </div>
    </div>
  );
});

Summary.displayName = 'Summary';
