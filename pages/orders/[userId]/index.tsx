import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ordersMockData from '../../../src/mock/small/orders.json';
import usersMockData from '../../../src/mock/small/users.json';
import { Order } from '@/src/type/orders/index';
import '../../../src/styles/styles.css';
import OrderList from '@/src/components/common/orderList';
import Pagination from '@/src/components/common/pagination';

const Orders = () => {
  const params = useParams<{ tag: string; item: string }>();
  const [userOrders, setUserOrders] = useState<Order[]>([]);

  const PAGE_SIZE = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const orderData = userOrders.slice(startIndex, endIndex);
  console.log(orderData, 'orderData');

  const totalSpent = userOrders.reduce(
    (sum, { total }) => sum + total,
    0 // Start with 0 for the accumulator
  );

  const getUserName = () => {
    const userName = usersMockData.filter((user) => user.id === params?.userId);
    return userName[0]?.firstName + ' ' + userName[0]?.firstName;
  };

  useEffect(() => {
    if (ordersMockData && Array.isArray(ordersMockData)) {
      const filteredOrders = ordersMockData.filter((order) => order.user === params?.userId);
      setUserOrders(filteredOrders);
    }
  }, [params?.userId]);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='header'>
        <p>
          Order List ({getUserName()}){' '}
          <Link className='link secondary-button' href='/users'>
            Back to User List
          </Link>
        </p>
      </div>
      <h3 className={`mb-3 ml-4 text-2xl font-semibold text-left`}>Total Spent: {totalSpent}</h3>
      <h3 className={`mb-3 ml-4 text-2xl font-semibold text-left`}>Total Order: {userOrders?.length}</h3>
      {orderData?.map((order: Order, index) => <OrderList data={order} />)}
      <Pagination data={userOrders} pageSize={PAGE_SIZE} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </main>
  );
};

export default Orders;
