
import usersMockData from '../src/mock/large/users.json';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import UserOrders from './orders';
import '../app/globals.css';

const PAGE_SIZE = 10;

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(null);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const usersData = usersMockData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(usersMockData.length / PAGE_SIZE);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const showOrders = (user: any) => {
    setUser(user);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
    <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm'>

          {user ? (
            <UserOrders user={user} />
          ) : (
            <div>
              <h1 className='mb-3 ml-4 text-2xl font-semibold text-left'>Users</h1>
              <div className='row list-group list-group-horizontal' aria-current='true'>
                {usersData.map((user) => (
                  <div className='grid grid-rows-2 grid-flow-col gap-2' aria-current='true' key={user.id}>
                      <h5 className='row-span-3'>
                        {user.firstName} {user.lastName}
                      </h5>
                      <button  type='button' className='row-span-3 bg-white border border-gray-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2' onClick={() => showOrders(user)}>View Orders</button>
                  </div>
                ))}</div>
              <div className='pagination'>
                <button onClick={prevPage} disabled={currentPage === 1}>
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button onClick={nextPage} disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>
            </div>
          )}
          </div>
        </main>
  );
};

export default Users;
