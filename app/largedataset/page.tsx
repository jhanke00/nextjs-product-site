'use client';
import smallData from '@/src/mock/large/users.json';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const PAGE_SIZE = 20;

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const data = [...smallData];
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const userData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <div className='left-0 top-0 w-full border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30'>
        <p>Acceptance Criteria</p>
        <p>I need an endpoint that returns my user information</p>
        <p>I need an endpoint that returns all of my user's orders if there are any</p>
        <p>I need an endpoint that returns how much the user has spent on orders</p>
      </div>
      <table>
        <tbody>
          <tr>
            <th>FirstName</th>
            <th>LastName</th>
            <th>PhoneNo</th>
            <th>Email</th>
            <th>View Orders</th>
          </tr>
          {userData.map((user) => (
            <tr key={user.id}>
              <td className={`m-0 max-w-[30ch] text-sm opacity-50`}> {user.firstName}</td>
              <td className={`m-0 max-w-[30ch] text-sm opacity-50`}> {user.lastName}</td>
              <td className={`m-0 max-w-[30ch] text-sm opacity-50`}> {user.phoneNumber}</td>
              <td className={`m-0 max-w-[30ch] text-sm opacity-50`}> {user.email}</td>
              <td>View Orders</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex justify-around w-full border-t-2 pt-4'>
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
    </main>
  );
}
