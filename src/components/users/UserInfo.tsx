import { User } from '@/src/type/users';
import styles from './UserInfo.module.css';

interface UserInfoProps {
  user: User;
}

export default function UserInfo({ user }: Readonly<UserInfoProps>) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.name}>{`${user.firstName} ${user.lastName}`}</h1>
        </div>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <strong>Email:</strong>
            <span>{user.email}</span>
          </div>
          <div className={styles.infoItem}>
            <strong>Phone:</strong>
            <span>{user.phoneNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
