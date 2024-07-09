import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/src/type/Products';
import Pagination from './Pagination';

export default function ProductsList({ productData, isSearch }: any | []) {
  const [chunkOfData, setChunkOfData] = useState([]);

  return (
    <>
      <table className='w-full mt-[20px] bg-white'>
        <thead>
          <tr className='bg-[#1E293B] h-[30px]'>
            <th className='w-[20%] text-sm text-white font-normal'>Name</th>
            <th className='w-[20%] text-sm text-white font-normal'>Price</th>
            <th className='w-[20%] text-sm text-white font-normal'>Category</th>
            <th className='w-[20%] text-sm text-white font-normal'>Count In Stock</th>
            <th className='w-[20%] text-sm text-white font-normal'>Rating</th>
          </tr>
        </thead>
        <tbody>
          {chunkOfData.length > 0 ? (
            chunkOfData.map((products: Product, idx: number) => {
              return (
                <tr
                  key={idx}
                  className='w-full border-b border-blue-200 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg hover:bg-blue-100 hover:font-semibold'
                >
                  <td className='whitespace-nowrap px-3 py-3 text-blue-600'>
                    <Link href={`/productslist/${products.id}`}>{products.name}</Link>
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>{products.price}</td>
                  <td className='whitespace-nowrap px-3 py-3'>{products.category}</td>
                  <td className='whitespace-nowrap px-3 py-3'>{products.countInStock}</td>
                  <td className='whitespace-nowrap px-3 py-3'>{products.rating}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5}>
                <div className='w-full flex justify-center items-center p-2 text-red-500 font-semibold'>
                  No products found!
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination data={productData} setChunkOfData={setChunkOfData} isSearch={isSearch} />
    </>
  );
}
