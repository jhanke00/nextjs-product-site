'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import usersMockData from '../src/mock/small/users.json';
import '../src/styles/styles.css';
// import { useUserIdCotext } from '@/context/context';
import Pagination from '@/src/components/common/pagination';
const PAGE_SIZE = 5;
const Users = () => {
  // const { userId, updateUserId } = useUserIdCotext();
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const usersData = usersMockData.slice(startIndex, endIndex);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='header'>
        <p>User's List</p>
      </div>
      <table id='table-container'>
        <thead>
          <tr>
            <th>User&#39;s Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <tr key={user.id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>
                <Link className='link primary-button' href={`/orders/${user.id}`}>
                  View Orders
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination data={usersMockData} pageSize={PAGE_SIZE} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </main>
  );
};

export default Users;
