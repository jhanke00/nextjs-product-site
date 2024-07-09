import { OrderDetails } from '@/src/components/OrderDetails';
import largeData from '@/src/mock/large/orders.json';
import smallData from '@/src/mock/small/orders.json';
import largeuserData from '@/src/mock/large/users.json';
import smalluserData from '@/src/mock/small/users.json';
import Link from 'next/link';

const userOrders = ({ params }: { params: { userId: string } }) => {
  const data = [...largeData, ...smallData];
  const userData = [...largeuserData, ...smalluserData];

  const orders = data.filter((item) => item.user === params.userId);
  const sortedOrders = orders.sort((a: any, b: any) => new Date(b.time).getTime() - new Date(a.time).getTime());
  console.log(typeof new Date(sortedOrders[0].time).getTime());

  const selectedUser = userData.find((user) => user.id === params.userId);

  const totalExpenses = orders.reduce((sum, curr) => sum + curr.total, 0);

  if (!orders) {
    return <p>Order Items not found for this user!</p>;
  }

  return (
    <div>
      <Link href={`/users`}>
        <div className='text-lg mx-10'>Back</div>
      </Link>
      <div className='flex min-h-screen flex-col items-center'>
        <div className='text-xl font-bold my-2'>
          Order History - {selectedUser?.firstName} {selectedUser?.lastName}
        </div>
        <div className='text-lg text-lime-950 my-6 font-semibold'>Total Expenses: Rs. {totalExpenses}</div>
        <div className='z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex'>
          <div className='grid lg:max-w-5xl lg:w-full lg:grid-cols-4 lg:text-left'>
            {sortedOrders.map((order: any, index: any) => (
              <OrderDetails data={order} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default userOrders;
