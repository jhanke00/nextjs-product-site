import GetOrders from '@/src/utils/fetchdata/getOrders';
import GetUsers from '@/src/utils/fetchdata/getUsers';
import Link from 'next/link';

const userOrders = ({ params }: { params: { userId: string } }) => {
  const data = GetOrders();
  const user = data.filter((item) => item.user === params.userId);
  const userData = GetUsers().filter((user) => user.id === params.userId);
  const totalAmount = user.reduce((total, order) => total + order.total, 0);

  if (!user) {
    return <p>User not Found</p>;
  }

  return (
    <div className='flex min-h-screen flex-col p-24'>
      <h2 className='text-2xl font-semibold'>
        Order Details For: {userData[0].firstName + ' ' + userData[0].lastName}
      </h2>

      <h3 className='text-xl mt-5'>Total Amount Spent: ${totalAmount}</h3>

      <div className='relative overflow-x-auto shadow-md sm:rounded-lg m-5'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                #
              </th>
              <th scope='col' className='px-6 py-3'>
                Order Details
              </th>
              <th scope='col' className='px-6 py-3'>
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {user.map((order, index) => (
              <>
                <tr
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                  key={index}
                >
                  <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
                    {index + 1}
                  </th>
                  <td className='px-6 py-4'>
                    {order.items.map((item) => (
                      <>
                        <p>Item: {item.name}</p>
                        <p>Price: {item.price}</p>
                        <p>Quantity: {item.count}</p>
                        <br />
                      </>
                    ))}
                  </td>
                  <td className='px-6 py-4'>${order.total}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      <Link
        href={'/users/'}
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-40'
      >
        Back to All Users
      </Link>
    </div>
  );
};

export default userOrders;
