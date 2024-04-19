import UserList from '@/src/components/users/UserList';
import GetUsers from '@/src/utils/fetchdata/getUsers';

export default function ProductSearch() {
  const userData = GetUsers();

  return (
    <main className='flex min-h-screen flex-col items-center w-full lg:p-24 md:p-20 sm:p-10'>
      <h2 className='font-sans text-4xl text-gray-900 dark:text-white text-center m-5'>All Users</h2>
      <UserList users={userData} />
    </main>
  );
}
