'use client';
//import React, { useState } from "react";
//import largeData from '@/src/mock/large/orders.json';
import smallData from '@/src/mock/small/orders.json';

const productDetail = ({ params }: { params: { orderId: string } }) => {
  const data = [...smallData];
  const product = data.find((item) => item.user === params.orderId);

  const calculateTotal = () => {
    let total = 0;
    product.items.map((item) => (total = total + item.count * item.price));
    return total;
  };

  if (!product) {
    return <p>Product not Found</p>;
  }

  return (
    <div className='flex min-h-screen flex-col p-24 border-gray-300'>
      <div className='left-0 top-0 w-full border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30'>
        Product Details - Need an endpoint that queries for a single product and returns the information for that
        product
      </div>
      <div className='grid lg:max-w-5xl lg:w-full lg:grid-cols-3 lg:text-left'>
        <table>
          <tr>
            <th>Product Name</th>
            <th>Count</th>
            <th>Price</th>
          </tr>
          {product.items.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>{item.price}</td>
            </tr>
          ))}
          <tr>
            <td>
              <b>Total Price</b>
            </td>
            <td>&nbsp;</td>
            <td>
              <b>{calculateTotal()}</b>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default productDetail;
