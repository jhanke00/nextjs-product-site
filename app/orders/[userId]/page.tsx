'use client';
import { useState, useEffect } from 'react';
import { Summary } from '../../../src/components/orders/summary';
import { Item, UserOrdersProps } from '../../../src/type/orders';
import { TotalSummary } from '../../../src/components/orders/totalsummary';
const PRODUCT_DETAIL = process.env.NEXT_PUBLIC_PRODUCT_DETAIL;

interface Order {
  id: number;
  userId: number;
  items: Item[];
  count: number;
  totalPrice: number;
}
export default function UserOrders({ params }: UserOrdersProps) {
  const [userOrders, setUserOrders] = useState([] as Item[]);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
      const response = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: params?.userId, action: 'order' }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const data: Order[] = await response.json(); // Type the data as an array of Order
      const items = data.flatMap((order: Order) => order.items);

      setUserOrders(items);
    };

    fetchData();
  }, [params?.userId]);

  return (
    <div>
      <div>
        <section className='relative'>
          <div className=''>
            <div className=''>
              <div className='p-6 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400'>
                <h2 className='font-manrope font-bold text-3xl leading-10 text-white pb-6 border-b border-gray-200'>
                  {PRODUCT_DETAIL}
                </h2>

                <div>{userOrders?.map((item: Item) => <Summary key={item.id} data={item} />)}</div>

                <TotalSummary data={userOrders} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
