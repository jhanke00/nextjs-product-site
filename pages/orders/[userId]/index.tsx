import { GetServerSideProps } from 'next';
import Link from 'next/link';
import OrderList from '@/src/components/orders/OrderList';
import { UserOrdersPageProps } from '@/src/type/orders';
import { OrderUtils } from '@/src/utils/orders';
import styles from '@/pages/orders/[userId]/styles.module.css';
import { UserUtils } from '@/src/utils/users';

export default function UserOrdersPage({ orders, totalSpent, user }: Readonly<UserOrdersPageProps>) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Orders for{' '}
        <Link className={styles.userLink} href={`/users/${user.id}`} passHref>
          {`${user.firstName} ${user.lastName}`}
        </Link>
      </h1>
      <p className={styles.totalSpent}>Total Spent: {totalSpent}</p>
      <OrderList orders={orders} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.params?.userId as string;
  const orderUtils = new OrderUtils();
  const userUtils = new UserUtils();

  const orders = orderUtils.fetchUserOrders(userId);
  const totalSpent = orderUtils.calculateTotalSpent(userId);

  const user = userUtils.fetchUserById(userId);

  return {
    props: {
      orders,
      totalSpent: totalSpent.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      user,
    },
  };
};
