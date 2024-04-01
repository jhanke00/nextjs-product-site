'use client';
import { Order } from '@/src/type/orders/index';
import { combineItemsOfDuplicateUsers, getUserName } from '@/src/utils/orderUser.utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import OrderTable from '@/src/components/orderTable/orderTable';
import { User } from '@/src/type/users/index';
import Link from '@/node_modules/next/link';
import smallOrderList from '@/src/mock/small/orders.json';
import largeOrderList from '@/src/mock/large/orders.json';

import userSmallDataList from '@/src/mock/small/users.json';
import userLargeDataList from '@/src/mock/large/users.json';
import Loader from '@/src/components/loader/loader';
import NoRecords from '@/src/components/no-records/no-records';

const filterPrices = [
  {
    lable: 'All',
    minValue: 0,
    maxValue: 1000,
    key: 'first',
  },
  {
    lable: '0 - 100',
    minValue: 0,
    maxValue: 100,
    key: '100',
  },
  {
    lable: '100 - 1000',
    minValue: 100,
    maxValue: 1000,
    key: '1000',
  },
  {
    lable: 'Above 1000',
    minValue: 1000,
    maxValue: 0,
    key: 'last',
  },
];
export default function OrdersForSpecificUser({ params }: { params: { userId: string } }) {
  const [filterPrice, setFilterPrice] = useState(filterPrices[0].key);
  const totalCummulativeOrders = [...smallOrderList, ...largeOrderList];
  const data: Order[] = combineItemsOfDuplicateUsers(totalCummulativeOrders as unknown as Order[]);

  const [userOrder, setUserOrder] = useState<Order | undefined | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const totalCummulativeUsers = [...userSmallDataList, ...userLargeDataList];
  const userData: User[] = totalCummulativeUsers as unknown as User[];

  useEffect(() => {
    if (params.userId) {
      const result = data.find((obj) => obj.user === params.userId);
      if (result) {
        const filter = filterPrices.find((obj) => obj.key === filterPrice);
        if (filter) {
          result.items = result?.items.filter((obj) => {
            const calculateValue = obj.price * obj.count;
            if (filter.key === 'first' || filter.key == 'last') {
              return calculateValue >= filter?.minValue;
            } else {
              return calculateValue >= filter?.minValue && calculateValue <= filter?.maxValue;
            }
          });
        }
        setUserOrder(result);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
  }, [params.userId, filterPrice]);

  const getTotalOrderPrice = useCallback(() => {
    return userOrder?.items.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.price * currentValue.count;
    }, 0);
  }, [userOrder]);

  const getFilters = useMemo(() => {
    return (
      <div className='mb-3 flex justify-end me-3'>
        <div>
          <p className='font-bold text-blue-500'>{'Filter by Total Prices'}</p>
          <select
            id='pageSize'
            value={filterPrice}
            onChange={(event) => setFilterPrice(event.target.value)}
            className='appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
          >
            {filterPrices.map((filter: any, index: number) => {
              return (
                <option key={index} value={filter.key}>
                  {filter.lable}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }, [filterPrice, setFilterPrice, filterPrices]);
  const getHeader = useMemo(() => {
    return (
      <div className='flex justify-between me-3 ms-3'>
        <p className='text-blue-500 p-2 font-bold'>{getUserName(userData, userOrder?.user ?? '')}</p>
        <p className='p-2 font-bold'>
          <span className='text-blue-500'>Total Order Price - {getTotalOrderPrice()}</span>
        </p>
        <Link
          href={`/orders`}
          onClick={(ev) => ev.stopPropagation()}
          className='inline-block px-4 py-2 bg-gray-400 text-white font-semibold rounded-md shadow hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
        >
          Navigate to orders
        </Link>
      </div>
    );
  }, [userData, userOrder, getUserName]);

  return (
    <div className='min-h-screen bg-white'>
      {isLoading ? (
        <Loader />
      ) : userOrder ? (
        <>
          {getFilters}
          {getHeader}
          <div className='m-3 p-3 bg-white shadow-lg rounded-lg flex justify-center'>
            {userOrder.items.length > 0 ? <OrderTable order={userOrder as Order} /> : <NoRecords />}
          </div>
        </>
      ) : null}
    </div>
  );
}
