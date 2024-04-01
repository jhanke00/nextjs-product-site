import { IOrderTable, Item } from '@/src/type/orders/index';
import { formatDate } from '@/src/utils/orderUser.utils';
import { Fragment } from 'react';
export const OrderTable = (props: IOrderTable) => {
  return (
    <table className='min-w-full divide-y divide-gray-200'>
      <thead>
        <tr>
          <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
            Product Name
          </th>
          <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
            Price
          </th>
          <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
            Count
          </th>
          <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
            Total Price
          </th>
          <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
            Time
          </th>
        </tr>
      </thead>
      <tbody className='bg-white divide-y divide-gray-200'>
        {props.order.items.map((item: Item, index: number) => {
          return (
            <Fragment key={`${props.order.user}_${item.id}_${index}`}>
              <tr className='bg-gray-50'>
                <td className='px-6 py-4 whitespace-nowrap text-grey-500'>{item.name}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{item.price}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{item.count}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{item.price * item.count}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{formatDate(item?.time ?? '')}</td>
              </tr>
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default OrderTable;
