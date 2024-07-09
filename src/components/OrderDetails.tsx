import { OrderProps } from '@/src/type/orders';

 const OrderDetails = ({ data }: OrderProps) => {
  const { name, price, count, id } = data;

  return (
    <div className='rounded-3xl p-6 border border-black-100 flex flex-col md:flex-row md:items-center gap-5 transition-all duration-500 hover:border-black-400'>
      <div className='grid grid-cols-2 md:grid-cols-2 w-full gap-3 md:gap-8 grid-flow-col'>

        <div className='flex flex-1 flex-row justify-around' style={{border:'1px solid'}}>
          <div className='flex flex-1 flex-col '>
            <h2 className='text-black mb-3 text-sm'>Order ID: {id}</h2>
            <p className='text-sm'>Name: {name}</p>
            <p className='text-sm'>Price: {price}</p>
            <p className='text-sm'>count: {count}</p>
          </div>

          <div className='flex-col'>
            <p className='text-sm' style={{marginRight:'540px'}}> {count * price}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OrderDetails;