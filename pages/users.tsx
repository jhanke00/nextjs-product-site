import usersMockData from '../src/mock/large/users.json';
import { useState, useEffect } from 'react';
import Link from 'next/link';

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
      <style jsx>{`
        table {
          width: 60%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th,
        td {
          border: 1px solid #dddddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
          border: 1px solid #dddddd;
          padding: 8px;
          text-align: left;
        }
        button {
          border: none;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 14px;
          margin: 4px 2px;
          border-radius: 4px;
          width: 38%;
          background-image: none;
          background-color: transparent;
          text-transform: none;
          color: black;
          cursor: pointer;
        }
        .pagination {
          justify-content: center;
          display: flex;
          align-items: center;
        }
      `}</style>
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
                <Link href={`orders?userId=${user.id}`}>View Orders</Link>
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
