import { makeButton, makeDiv, makeH2, makeLi, makeSpan, makeUl } from 'named-components';
import styles from './UsersPage.module.scss';
import { useRouter } from 'next/router';
import { useLoadedUser } from '../../user/useLoadedUser';
import { User } from '@/src/domain/user/User';
import { useLoadedUserOrders } from '../../orders/useLoadedUserOrders';
import { pagesUrls } from '../pagesUrls';
import { useUserOrdersSummary } from '../../orders/useUserOrdersSummary';
import { ordersSummaryFormatter } from '../../orders/ordersSummaryFormatter';
import { OrderCard } from '../../orders/OrderCard/OrderCard';

export type UserPageProps = {
  userId: User['id'];
  page: number;
  perPage: number;
};

export const UserPage = ({ userId, page, perPage }: UserPageProps) => {
  const { user } = useLoadedUser(userId);

  if (!user) {
    throw new Error('If user is null it means the user was not found and we should never get here to begin with!');
  }

  const { userOrders, userOrdersPagination } = useLoadedUserOrders({ userId, page, perPage });

  const { ordersSummary, ordersSummaryStatus } = useUserOrdersSummary(userId);

  const router = useRouter();

  const { hasNextPage, hasPreviousPage } = userOrdersPagination;

  const goToPreviousPage = () => {
    const updatedUrl = pagesUrls.user({ page: page - 1, perPage, userId: user.id });
    router.push(updatedUrl);
  };

  const goToNextPage = () => {
    const updatedUrl = pagesUrls.user({ page: page + 1, perPage, userId: user.id });
    router.push(updatedUrl);
  };

  return (
    <Container>
      <UserSection>
        <UserName>
          {user.firstName} {user.lastName}
        </UserName>

        <UserEmail>{user.email}</UserEmail>
      </UserSection>

      <OrdersSummarySection>
        <OrdersSummarySectionTitle>Summary</OrdersSummarySectionTitle>

        <OrdersSummary>
          <OrdersSummaryOrderCount>
            Order Count: {ordersSummaryFormatter.orderCount(ordersSummary?.orderCount)}
          </OrdersSummaryOrderCount>

          <OrdersSummaryTotalExpenditure>
            Total Spent: {ordersSummaryFormatter.totalExpenditure(ordersSummary?.totalExpenditureInCents)}
          </OrdersSummaryTotalExpenditure>
        </OrdersSummary>
      </OrdersSummarySection>

      <OrdersSection>
        <OrdersSectionTitle>Orders</OrdersSectionTitle>

        <OrdersList>
          {userOrders.map((order) => (
            <OrdersListItem key={order.key}>
              <OrderCard order={order} />
            </OrdersListItem>
          ))}
        </OrdersList>
      </OrdersSection>

      <PaginationSection>
        <GoToPreviousPageButton disabled={!hasPreviousPage} onClick={goToPreviousPage}>
          Previous
        </GoToPreviousPageButton>

        <Page>{page}</Page>

        <GoToNextPageButton disabled={!hasNextPage} onClick={goToNextPage}>
          Next
        </GoToNextPageButton>
      </PaginationSection>
    </Container>
  );
};

const Container = makeDiv(styles.container);

const UserSection = makeDiv(styles.userSection);

const UserName = makeSpan(styles.userName);

const UserEmail = makeSpan();

const OrdersSummarySection = makeDiv(styles.ordersSummarySection);

const OrdersSummarySectionTitle = makeH2(styles.ordersSummarySectionTitle);

const OrdersSummary = makeDiv(styles.ordersSummary);

const OrdersSummaryOrderCount = makeSpan(styles.ordersSummaryOrderCount);

const OrdersSummaryTotalExpenditure = makeSpan(styles.ordersSummaryTotalExpenditure);

const OrdersSection = makeDiv(styles.ordersSection);

const OrdersSectionTitle = makeH2(styles.ordersSectionTitle);

const OrdersList = makeUl(styles.ordersList);

const OrdersListItem = makeLi(styles.ordersListItem);

const PaginationSection = makeDiv(styles.paginationSection);

const GoToPreviousPageButton = makeButton(styles.goToPreviousPageButton);

const Page = makeSpan(styles.page);

const GoToNextPageButton = makeButton(styles.goToNextPageButton);
