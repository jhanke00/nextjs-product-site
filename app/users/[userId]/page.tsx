'use client';

import { OrderDetails } from '@/src/components/OrderDetails';
import largeData from '@/src/mock/large/orders.json';
import smallData from '@/src/mock/small/orders.json';
import { useEffect, useState } from 'react';
import { Item } from '@/src/type/orders';

const userOrders = ({ params }: { params: { userId: string } }) => {

  const [orderedItemsList, setOrderedItemsList] = useState([] as Item[]);
  const [totalExpense, setTotalExpense] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const data: any = JSON.parse(JSON.stringify(largeData)).concat(JSON.parse(JSON.stringify(smallData)));
    const orders = data.filter((item: any) => item.user === params.userId);
    const orderedItems = orders.map((order: any) => {
      return order.items;
    }).flat();
    const TotalExpenditure = orders.reduce((sum: any, order: any) => sum + order.total, 0);
    setOrderedItemsList(orderedItems);
    setTotalExpense(TotalExpenditure);
    setLoader(false);
  }, [params.userId]);


  return (
    <div className='flex min-h-screen flex-col p-8 item-center'>
      <h1 className='text-2xl font-semibold items-center'>Order Details</h1>
      {loader && <p>Loading Orders..Please wait!</p>}
      {
        !loader && orderedItemsList.length === 0 ? <p>No Orders Yet!</p>
          :
          !loader &&
          <>
            <div>
            <div className='text-right'>
              Order Total: {totalExpense}
            </div>
              <h3 className={`mb-3 text-xl `}>
                {
                  orderedItemsList.map((item: any) => {
                    return <OrderDetails data={item} />
                  })
                }
              </h3>
            </div>
          </>
      }
    </div>
  );
};

export default userOrders;
