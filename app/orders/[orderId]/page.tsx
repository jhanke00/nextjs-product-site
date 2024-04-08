import largeData from '@/src/mock/large/orders.json';
import smallData from '@/src/mock/small/orders.json';

const orderDetail = ({ params }: { params: { orderId: string } }) => {
  const data = [...largeData, ...smallData];
  // const order = data.find((item) => item?.id === params.orderId);
  // if (!order) {
  //   return <p>Order not Found</p>;
  // }

  return (
    <p>order details</p>
    // <div className='flex min-h-screen flex-col p-24'>
    //   <h1 className='text-2xl font-semibold'>Order Description</h1>
    //   <h3 className={`mb-3 text-xl `}>{order.name}</h3>
    //   <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Price: {order.price}</p>
    //   <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Description: {order.description}</p>
    //   <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Category: {order.category}</p>
    //   <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Rating: {order.rating}</p>
    //   <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Reviews: {order.numReviews}</p>
    //   <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Stock: {order.countInStock}</p>
    // </div>
  );
};

export default orderDetail;
