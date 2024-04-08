import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import OrderView from '../../../src/components/OrderView';
import ordersMockData from '../../../src/mock/large/orders.json';
import usersMockData from '../../../src/mock/large/users.json';
import { Order, Item } from '../../../src/type/orders';
import { User } from '../../../src/type/users';

const OrderPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [userInfo, setUserInfo] = useState<User[]>([]);

  useEffect(() => {
    const userId = router.query.userId as string;
    if (usersMockData && Array.isArray(usersMockData)) {
      const filteredUser = usersMockData.filter((user) => user.id === userId);
      setUserInfo(filteredUser);
    }
    if (ordersMockData && Array.isArray(ordersMockData)) {
      const filteredOrders = ordersMockData.filter((order) => order.user === userId);
      setUserOrders(filteredOrders);
    }
  }, [router.query.userId]);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>User&#39;s Orders Page</h1>
      <OrderView orders={userOrders} user={userInfo} />
    </>
  );
};

export default OrderPage;
