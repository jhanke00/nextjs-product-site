import { Order } from '@/src/type/orders';
import OrderItem from '@/src/components/orders/OrderItem';
import styles from './OrderList.module.css';

interface OrderListProps {
  orders: Order[];
}

export default function OrderList({ orders }: Readonly<OrderListProps>) {
  if (!orders.length) return <p className={styles.noOrders}>No orders found for this user.</p>;

  return (
    <div className={styles.orderList}>
      {orders.map((order, index) => (
        <OrderItem key={index} order={order} />
      ))}
    </div>
  );
}
