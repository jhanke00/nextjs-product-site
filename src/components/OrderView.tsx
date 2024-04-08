import React from 'react';
import { Order } from '../../src/type/orders';
import { User } from '../../src/type/users';
import Link from 'next/link';
import '../styles/styles.css';

interface OrderViewProps {
  orders: Order[];
  user: User[];
}
const TABLE_HEAD = ['Item Name', 'Quantity', 'Price'];

const OrderView: React.FC<OrderViewProps> = ({ orders, user }) => {
  const totalSpent = orders.reduce((total, order) => total + order.total, 0);
  const noOfOrders = orders.length;

  return (
    <>
      <div className='userNav' style={{ float: 'right' }}>
        <Link href='/users'>
          <button style={{ width: '100%' }}>Back to User&#39;s List</button>
        </Link>
      </div>
      <h2>User Details</h2>
      {user.map((userDetails) => (
        <>
          <p>
            <strong>Name:</strong>
            {userDetails.firstName} {userDetails.lastName}{' '}
          </p>
          <p>
            <strong>Email:</strong>
            {userDetails.email}{' '}
          </p>
          <p>
            <strong>Phone Number:</strong>
            {userDetails.phoneNumber}{' '}
          </p>
        </>
      ))}
      <div className='total'>
        <p>Number of Orders Done By User: {noOfOrders}</p>
      </div>
      <div className='total'>Overall Total Spent by User: {totalSpent}</div>
      <h2>Order&#39;s Details </h2>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th className='noOfOrders' key={index}>
                {head}
              </th>
            ))}
          </tr>
        </thead>
        {orders.map((order, index) => (
          <>
            <tbody>
              <h3>Order #{index + 1}</h3>
              {order.items.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.count}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
              <tr>
                <td></td>
                <th className='noOfOrders'>Sub Total</th>
                <td colSpan={3} style={{ fontWeight: 'bold' }}>
                  {order.total}
                </td>
              </tr>
              <tr>
                <td></td>
                <th className='noOfOrders'>Purchase Date</th>
                <td colSpan={3} style={{ fontWeight: 'bold' }}>
                  {new Date(order.time).toISOString().slice(0, 10)}
                </td>
              </tr>
            </tbody>
          </>
        ))}
      </table>
      <div className='total'>Overall Total Spent by User: {totalSpent}</div>
    </>
  );
};

export default OrderView;
