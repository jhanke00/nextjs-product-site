import usersMockData from '../src/mock/large/users.json';
import { useState, useEffect, SetStateAction } from 'react';
import Link from 'next/link';
import UserOrders from './orders';

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
    <main className='flex min-h-screen flex-col items-center p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <div className='grid lg:max-w-5xl lg:w-full lg:grid-cols-2 lg:text-left'>
          {user ? (
            <UserOrders user={user} />
          ) : (
            <div>
              <h1 style={{ textAlign: 'center' }}>Users</h1>

              <div className='list-group list-group-horizontal'>
                {usersData.map((user) => (
                  <div className='list-group-item  row  col-12 d-inline' aria-current='true' key={user.id}>
                    <div className='mb-1 col-6 m-0 max-w-[30ch]'>
                      {' '}
                      <h5 className='mb-1 col-6 m-0 max-w-[30ch]'>
                        {user.firstName} {user.lastName}
                      </h5>
                    </div>
                    <div className='col-6 justify-content-end'>
                      <button onClick={() => showOrders(user)}>View Orders</button>
                    </div>
                  </div>
                ))}
              </div>

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
      </div>
    </main>
  );
};

export default Users;
