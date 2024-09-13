import { Order } from '@/src/type/orders';
import styles from './OrderItem.module.css';

interface OrderItemProps {
  order: Order;
}

export default function OrderItem({ order }: Readonly<OrderItemProps>) {
  const { items, total, time } = order;

  return (
    <div className={styles.card}>
      <div className={styles.orderHeader}>
        <h2 className={styles.orderDate}>Order Date: {new Date(time).toLocaleDateString('en-US')}</h2>
      </div>

      <ul className={styles.itemsList}>
        {items.map((item) => (
          <li key={item.id}>
            <div className={styles.itemName}>{item.name}</div>
            <div className={styles.itemPriceCount}>
              <span>{item.count} pcs</span>
              <span>{Number(item.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.totalSpent}>{total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
    </div>
  );
}
