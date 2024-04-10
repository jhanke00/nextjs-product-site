
import React, { useEffect, useState } from 'react';
import ordersMockData from '../src/mock/large/orders.json';
import { Order, Item } from '../src/type/orders';
import { User } from '../src/type/users';
import '../app/globals.css';

const UserOrders = ({ user }: { user: User }) => {
  // const { id, firstName, lastName } = user;
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const totalSpent = userOrders.reduce(
    (sum, { items }) =>
      items.reduce(
        (total, { price, count }) => total + Number(price)  * count,
        sum // Continue with the sum we already have
      ),
    0 // Start with 0 for the accumulator
  );
  useEffect(() => {
    if (ordersMockData && Array.isArray(ordersMockData)) {
      const filteredOrders = ordersMockData.filter((order) => order.user === user?.id );
      setUserOrders(filteredOrders);
    }
  }, [user?.id]);

  return (
    <>
      <h1 className={`mb-3 ml-4 text-2xl font-semibold text-left`}>
        User :{user?.firstName} {user?.lastName}(Total Spent:{totalSpent}
      </h1>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <div className='grid lg:max-w-5xl lg:w-full lg:grid-cols-2 lg:text-left'>
          {userOrders?.map((order: any) =>
            order?.items?.map((item: any) => (
              <div
                key={item?.id}
                className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
              >
                <h3 className={`mb-3 text-2xl font-semibold`}>{item?.name}</h3>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Price: {item?.price}</p>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Count: {item?.count}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default UserOrders;
