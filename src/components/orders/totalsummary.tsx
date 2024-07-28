import { useMemo } from 'react';
import { getProductCost, getSubTotal } from '../../utils/orders/ordercalculations';
const PRODUCT_COST = process.env.NEXT_PUBLIC_PRODUCT_COST;
const DELIVERY_CHARGE = process.env.NEXT_PUBLIC_DELIVERY_CHARGE;
const TAXES = process.env.NEXT_PUBLIC_TAXES;
const TAXES_LBL = process.env.NEXT_PUBLIC_TAXES_TITTLE;
const ORDER_SUMMARY = process.env.NEXT_PUBLIC_ORDER_SUMMARY;
const SHIPPING = process.env.NEXT_PUBLIC_SHIPPING;
const SUBTOTAL = process.env.NEXT_PUBLIC_SUBTOTAL;
import { TotalSummaryProps } from '../../type/orders';
import React from 'react';

export const TotalSummary = ({ data }: TotalSummaryProps) => {
  const productCost = useMemo(() => getProductCost(data), [data]);
  const subTotal = getSubTotal(productCost);

  return (
    <div className='p-6 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400'>
      <h2 className='font-manrope font-bold text-3xl leading-10 text-white pb-6 border-b border-gray-200'>
        {ORDER_SUMMARY}
      </h2>

      <div className='p-6 border-b border-gray-200'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='font-normal text-lg leading-8 text-gray-400'>{PRODUCT_COST}</p>
            <p className='font-medium text-lg leading-8 text-white-900'>&#8377;{productCost.toLocaleString()}</p>
          </div>
          <div>
            <p className='font-normal text-lg leading-8 text-gray-400'>{SHIPPING}</p>
            <p className='font-medium text-lg leading-8 text-white-600'>&#8377;{DELIVERY_CHARGE}</p>
          </div>
          <div>
            <p className='font-normal text-lg leading-8 text-gray-400'>{TAXES_LBL}</p>
            <p className='font-medium text-lg leading-8 text-white-600'>&#8377;{TAXES}</p>
          </div>
          <div>
            <p className='font-normal text-xl leading-8 text-gray-400'>{SUBTOTAL}</p>
            <p className='font-manrope font-bold text-2xl leading-9 text-white-600'>
              &#8377;{subTotal.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
