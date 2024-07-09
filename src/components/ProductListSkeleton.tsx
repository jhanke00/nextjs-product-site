import Skeleton from './Skeleton';
export default function ProductListSkeleton() {
  return (
    <div className='flex flex-col items-center'>
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
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </tbody>
      </table>
      <div className='w-full flex justify-center items-center bg-white p-2'>
        <div className='h-6 w-[150px] rounded bg-gray-200'></div>
      </div>
    </div>
  );
}
