import { UserPage } from '@/src/view/pages/users/UserPage';
import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';
import { getUsersPageServerSideProps } from '@/src/view/pages/users/getUsersPageServerSideProps';
import { User } from '@/src/domain/user/User';

export type PageProps = {
  dehydratedState: DehydratedState;
  userId: User['id'];
  page: number;
  perPage: number;
};

const Page = ({ dehydratedState, userId, page, perPage }: PageProps) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <UserPage userId={userId} page={page} perPage={perPage} />
    </HydrationBoundary>
  );
};

export default Page;

export const getServerSideProps = getUsersPageServerSideProps;
