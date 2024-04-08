import usersMockData from '../src/mock/large/users.json';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import '../src/styles/styles.css';

const PAGE_SIZE = 10;

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>User&#39;s List</h1>
      <table align='center'>
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
                <Link href={`orders/${user.id}`}>View Orders</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </>
  );
};

export default Users;
