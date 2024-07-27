'use client';
import { useState, useEffect } from 'react';
import { Summary } from '../../../src/components/orders/summary';
import { Item, UserOrdersProps, Users } from '../../../src/type/orders';
import { TotalSummary } from '../../../src/components/orders/totalsummary';
const PRODUCT_DETAIL = process.env.NEXT_PUBLIC_PRODUCT_DETAIL;

import orders from '../../../public/data/orders.json';
import users from '../../../public/data/users.json';
import React from 'react';

export default function UserOrders({ params }: UserOrdersProps) {
  const [userOrders, setUserOrders] = useState([] as Item[]);
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    const FilterOrders = orders.filter(({ userId }) => userId == params.userId);
    const FilteredUsers = users.find((user) => user.id == params.userId);

    const itemDictionary = FilterOrders.flatMap(({ items }) => items).reduce((dictionary: any, item) => {
      const { productId } = item;
      dictionary[productId] = dictionary[productId]
        ? { ...dictionary[productId], count: dictionary[productId].quantity + item.quantity }
        : { ...item };
      return dictionary;
    }, {});

    const OrdersData: Item[] = Object.values(itemDictionary);
    console.log(OrdersData, 'OrdersData');

    setUserOrders(OrdersData);
    setUserData(FilteredUsers);
  }, [params?.userId]);

  return (
    <div>
      <section className='relative'>
        <div className=''>
          <div className=' '>
            <div className='p-6 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400'>
              <h2 className='font-manrope font-bold text-3xl leading-10 text-white pb-6 border-b border-gray-200'>
                {PRODUCT_DETAIL}
              </h2>

              <div className=''>{userOrders?.map((item: Item) => <Summary key={item.id} data={item} />)}</div>
            </div>
            <div className=''>
              <TotalSummary data={userOrders} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
