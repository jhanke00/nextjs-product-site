'use client';
import Link from '@/node_modules/next/link';
import OrderTable from '@/src/components/orderTable/orderTable';
import Paginator from '@/src/components/paginator/paginator';
import { Order } from '@/src/type/orders/index';
import { User } from '@/src/type/users/index';
import { combineItemsOfDuplicateUsers, getUserName } from '@/src/utils/orderUser.utils';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import smallOrderList from '@/src/mock/small/orders.json';
import largeOrderList from '@/src/mock/large/orders.json';

import userSmallDataList from '@/src/mock/small/users.json';
import userLargeDataList from '@/src/mock/large/users.json';
import Loader from '@/src/components/loader/loader';
import NoRecords from '@/src/components/no-records/no-records';

export default function Orders() {
  const [pageSize, setPageSize] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentSelectedUser, setCurrentSelectedUser] = useState<number>(0);

  const totalCummulativeOrders = [...smallOrderList, ...largeOrderList];
  const data: Order[] = combineItemsOfDuplicateUsers(totalCummulativeOrders as unknown as Order[]);
  const totalPages = Math.ceil(data.length / pageSize);

  const PAGE_SIZES = [10, 50, 100];

  const totalCummulativeUsers = [...userSmallDataList, ...userLargeDataList];
  const userData: User[] = totalCummulativeUsers as unknown as User[];
  const [loading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setOrders(data.slice(startIndex, endIndex));
    setIsLoading(false);
  }, [currentPage, pageSize]);

  const pageChangeHandler = useCallback(
    (event: any) => {
      setCurrentPage(() => +event.target.value);
    },
    [setCurrentPage]
  );

  const pageSizeChangeHandler = useCallback(
    (event: any) => {
      setPageSize(+event.target.value);
      setCurrentPage(1);
    },
    [setCurrentPage, setPageSize]
  );

  const accordianClick = (index: number) => {
    index + 1 === currentSelectedUser ? setCurrentSelectedUser(0) : setCurrentSelectedUser(index + 1);
  };

  const getHeader = useCallback((order: Order) => {
    return (
      <div className='flex justify-between'>
        <p className='text-blue-500 p-2 font-bold'>{getUserName(userData, order.user)}</p>
        <p className='p-2 font-bold'>
          <span className='text-blue-500'>Total Order Price - {order.total}</span>
        </p>
        <Link
          href={`/orders/${order.user}`}
          onClick={(ev) => ev.stopPropagation()}
          className='inline-block px-4 py-2 bg-gray-400 text-white font-semibold rounded-md shadow hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
        >
          View in other page
        </Link>
      </div>
    );
  }, []);

  const getOrdersList = useMemo(() => {
    return (
      <>
        {orders.map((order: Order, orderIndex: number) => {
          return (
            <Fragment key={`${order.user}_${orderIndex}`}>
              <div className='p-3 m-2 bg-white shadow-lg rounded-lg'>
                <div onClick={() => accordianClick(orderIndex)}>{getHeader(order)}</div>
                <div key={order.user} className={'flex flex-wrap'}>
                  {currentSelectedUser === orderIndex + 1 && <OrderTable order={order}></OrderTable>}
                </div>
              </div>
            </Fragment>
          );
        })}
      </>
    );
  }, [orders, currentSelectedUser, getHeader]);

  return (
    <div className='min-h-screen bg-white'>
      <h3 className='text-center font-bold'>Users and Orders</h3>
      {loading ? (
        <Loader />
      ) : orders.length ? (
        <>
          <div className='flex items-center justify-end me-4'>
            <Paginator
              currentPage={currentPage}
              pageChangeHandler={pageChangeHandler}
              pageSizeChangeHandler={pageSizeChangeHandler}
              pageSize={pageSize}
              totalPages={totalPages}
              pageSizes={PAGE_SIZES}
              recordsPerPageTitle={'Records per page'}
            />
          </div>
          {getOrdersList}
        </>
      ) : (
        <NoRecords />
      )}
    </div>
  );
}
