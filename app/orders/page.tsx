'use client';
import largeData from '@/src/mock/large/orders.json';
import smallData from '@/src/mock/small/orders.json';


export default function Orders() {
  const user_id = 'e7524b77-c241-465f-9201-21e0ada4856b';
  const orderData = [...largeData, ...smallData];
  const updatedUserData = orderData.filter((order) => order.user === user_id);
  const totalSpent = updatedUserData.reduce(
    (sum, {items}) => items.reduce(
        (total, {price,count}) => total + (price*count),
        sum // Continue with the sum we already have
    ), 0 // Start with 0 for the accumulator
);
console.log('totalSpent', totalSpent);
  return (
    <main className='flex min-h-screen flex-col p-24'>
      <h1 className={`mb-3 ml-4 text-2xl font-semibold text-left`}>
        User :{user_id}(Total Spent:{totalSpent}
      </h1>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <div className='grid lg:max-w-5xl lg:w-full lg:grid-cols-2 lg:text-left'>
          { updatedUserData?.map((user:any)=>user?.items?.map((item: any) => (
            <div
              key={item.id}
              className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
            >
                <h3 className={`mb-3 text-2xl font-semibold`}>{item.name}</h3>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Price: {item.price}</p>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Count: {item.count}</p>
              </div>
          )))}
        </div>
      </div>

     
    </main>
  );
}
