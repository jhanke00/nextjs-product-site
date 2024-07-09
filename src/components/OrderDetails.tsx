import { OrderProps } from '../type/orders';
import dateFormatter from '../utils/dateFormatter';

export const OrderDetails = ({ data, index }: OrderProps) => {
  return (
    <div
      key={index}
      className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
    >
      {data.items.map((item: any) => (
        <div key={item.id}>
          <b className='mb-3 text-md font-semibold'>{item.name}</b>
          <p className={`m-0 max-w-30 text-sm opacity-50`}>
            {' '}
            x {item.count}: {item.price} x {item.count} = Rs. {item.price * item.count}
          </p>
        </div>
      ))}
      <b className='mb-3 text-md font-semibold'>Total Price: </b>
      <p className={`m-0 max-w-30 text-sm opacity-50`}>Rs. {data.total}</p>

      <b className='mb-3 text-md font-semibold'>Order Date: </b>
      <p className={`m-0 max-w-30 text-sm opacity-50`}>{dateFormatter(data.time)}</p>
    </div>
  );
};
