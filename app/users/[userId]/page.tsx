'use client';

import { OrderDetails } from '@/src/components/OrderDetails';
import largeData from '@/src/mock/large/orders.json';
import smallData from '@/src/mock/small/orders.json';
import largeuserData from '@/src/mock/large/users.json';
import smalluserData from '@/src/mock/small/users.json';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const userOrders = ({ params }: { params: { userId: string } }) => {
  const [orderList, setOrderlist] = useState<any>([]);
  const [fullName, setFullName] = useState('');
  const [expense, setExpense] = useState(0);

  const data = [...largeData, ...smallData];
  const userData = [...largeuserData, ...smalluserData];

  useEffect(() => {
    const orders = data.filter((item) => item.user === params.userId);
    const sortedOrders = orders.sort((a: any, b: any) => new Date(b.time).getTime() - new Date(a.time).getTime());
    setOrderlist(sortedOrders);

    const selectedUser = userData.find((user) => user.id === params.userId);
    setFullName(selectedUser?.firstName + ' ' + selectedUser?.lastName);

    const totalExpenses = orders.reduce((sum, curr) => sum + curr.total, 0);
    setExpense(totalExpenses);
  }, [params.userId]);

  if (!orderList) {
    return <p>Order Items not found for this user!</p>;
  }

  return (
    <div>
      <Link href={`/users`}>
        <div className='text-lg mx-10'>Back</div>
      </Link>
      <div className='flex min-h-screen flex-col items-center'>
        <div className='text-xl font-bold my-2'>Order History - {fullName}</div>
        <div className='text-lg text-lime-950 my-6 font-semibold'>Total Expenses: Rs. {expense}</div>
        <div>
          {orderList.map((order: any, index: any) => (
            <OrderDetails data={order} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default userOrders;
