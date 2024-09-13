import { GetServerSideProps } from 'next';
import { User } from '@/src/type/users';
import UserInfo from '@/src/components/users/UserInfo';
import styles from '@/pages/users/[id]/styles.module.css';
import { UserUtils } from '@/src/utils/users';
import Link from 'next/link';

interface UserPageProps {
  user: User;
}

export default function UsersPage({ user }: Readonly<UserPageProps>) {
  return (
    <div className={styles.container}>
      <Link className={styles.orderListLink} href={`/orders/${user.id}`} passHref>
        <h1>{`Back to Order List`}</h1>
      </Link>
      <div className={styles.userInfo}>
        <UserInfo user={user} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.params?.id as string;
  const userUtils = new UserUtils();

  const user = userUtils.fetchUserById(userId);

  return {
    props: {
      user,
    },
  };
};
