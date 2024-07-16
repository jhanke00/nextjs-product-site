import { useState } from 'react';
import { dateFormatter } from '@/src/utils/utils';
import Button from './button';
const OrderList = ({ data }: { data: any }) => {
  const [isShow, setIsShow] = useState(false);
  const toggleElement = () => {
    setIsShow(!isShow);
  };

  return (
    <main>
      <section className='container'>
        <p>
          <strong>Total Amount:</strong> {data.total}
        </p>
        <p>
          <strong>Total Item:</strong> {data.items.length}
        </p>
        <p>
          <strong>Order Date:</strong> {dateFormatter(data.time)}
        </p>
        {data.items?.map((item, index) => {
          return (
            <div className={isShow ? 'show' : 'hide'} key={index}>
              <p>
                Item Name: <strong>{item?.name}</strong>
              </p>
              <p>
                Quantity: <strong>{item?.count}</strong>
              </p>
              <p>Item Price: {item?.price}</p>
              <p>Total Amount: {item?.count * item?.price}</p>
            </div>
          );
        })}
        <Button
          className='block'
          buttonText={isShow ? <i className='arrow up'></i> : <i className='arrow down'></i>}
          handleClick={toggleElement}
          disable={false}
        />
      </section>
    </main>
  );
};

export default OrderList;
