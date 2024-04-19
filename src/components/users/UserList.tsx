import Link from 'next/link';
import React from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

interface UserListProps {
  users: User[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg m-5'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Phone Number
              </th>
              <th scope='col' className='px-6 py-3'>
                Email
              </th>
              <th scope='col' className='px-6 py-3'>
                <span className='sr-only'>View Orders</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                key={user.id}
              >
                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  {user.firstName} {user.lastName}
                </th>
                <td className='px-6 py-4'>{user.phoneNumber}</td>
                <td className='px-6 py-4'>{user.email}</td>
                <td className='px-6 py-4 text-right'>
                  <Link
                    href={`/users/${user.id}`}
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  >
                    View Orders
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div
                    key={user.id}
                    className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3 p-3'
                >
                    <Link href={`/products/${user.id}`}>
                        <ProductCard product={product} />
                        <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>{user.firstName} {user.lastName}</h3>

                        <p className='text-base font-normal leading-tight text-gray-500 dark:text-gray-400 my-3'>{user.phoneNumber}</p>

                        <p className='w-fit bg-blue-100 text-blue-800 text-xs font-semibold px-5 py-3 rounded dark:bg-blue-200 dark:text-blue-800'>
                            {user.email}
                        </p>
                    </Link>
                </div> */}
    </>
  );
};

export default UserList;
