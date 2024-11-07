import { test, expect } from '@playwright/test';
import { getSampleUser } from '../support/user/getSampleUser';
import { createContainer } from '../support/container';
import { formatUserName } from '@/src/view/user/formatUserName';
import { fetchUserOrdersSummary } from '@/src/domain/order/fetchUserOrdersSummary';
import { ordersSummaryFormatter } from '@/src/view/orders/ordersSummaryFormatter';
import { fetchUserOrders } from '@/src/domain/order/fetchUserOrders';
import { orderFormatter } from '@/src/view/orders/orderFormatter';
import { pagesUrls } from '@/src/view/pages/pagesUrls';
import { orderCardTestIds } from '@/src/view/orders/OrderCard/orderCardTestIds';

const describe = test.describe;

describe('When selected user exists', () => {
  test('Shows user page with orders and summary', async ({ page }) => {
    const { routes } = createContainer({
      page,
    });

    const sampleUser = getSampleUser();

    const initialPage = 1;
    const initialPerPage = 5;

    await routes.goToUserPage({ userId: sampleUser.id, page: initialPage, perPage: initialPerPage });

    // Checking user data
    await expect(page.getByText(formatUserName(sampleUser))).toBeVisible();
    await expect(page.getByText(sampleUser.email)).toBeVisible();

    // Checking order summary
    const ordersSummary = await fetchUserOrdersSummary(sampleUser.id);

    const formattedOrderCount = ordersSummaryFormatter.orderCount(ordersSummary.orderCount);
    const formattedTotalExpenditure = ordersSummaryFormatter.totalExpenditure(ordersSummary.totalExpenditureInCents);

    await expect(page.getByText('Order Count')).toContainText(formattedOrderCount);
    await expect(page.getByText('Total Spent')).toContainText(formattedTotalExpenditure);

    // Checking Orders
    const { meta } = await fetchUserOrders({ page: 1, perPage: initialPerPage, userId: sampleUser.id });

    const { numberOfPages } = meta;

    // We'll check orders for each page
    const checkPageOrders = async (pageNumber: number) => {
      const { orders } = await fetchUserOrders({ page: pageNumber, perPage: initialPerPage, userId: sampleUser.id });

      // Checking whether state is encoded in the url
      await page.waitForURL(
        pagesUrls.user({
          userId: sampleUser.id,
          page: pageNumber,
          perPage: initialPerPage,
        })
      );

      // We use Promise.all to do that in parallel
      // although I'm not entirely sure whether
      // this matters for playwright
      await Promise.all(
        orders.map(async (order) => {
          const orderCardLocator = page.getByTestId(orderCardTestIds.containerId(order));

          const formattedPlacedAt = orderFormatter.placedAt(order.placedAt);
          const formattedTotal = orderFormatter.total(order.totalInCents);

          await Promise.all(
            order.items.map(async (item) => {
              await expect(orderCardLocator.getByText(item.name)).toBeVisible();
            })
          );

          await expect(orderCardLocator.getByText(formattedPlacedAt)).toBeVisible();
          await expect(orderCardLocator.getByText(formattedTotal)).toBeVisible();
        })
      );
    };

    // Going forward
    const pagesList = Array.from({ length: numberOfPages }).map((_, index) => index + 1);

    for (const pageNumber of pagesList) {
      await checkPageOrders(pageNumber);

      const isLastPage = pageNumber === numberOfPages;
      const nextPageButtonLocator = page.getByRole('button').getByText('Next');

      if (!isLastPage) {
        await expect(nextPageButtonLocator).toBeEnabled();

        await nextPageButtonLocator.click();
      } else {
        await expect(nextPageButtonLocator).toBeDisabled();
      }
    }

    // Going backwards
    const reversePagesList = pagesList.toReversed();

    for (const pageNumber of reversePagesList) {
      await checkPageOrders(pageNumber);

      const isFirstPage = pageNumber === 1;
      const previousPageButtonLocator = page.getByRole('button').getByText('Previous');

      if (!isFirstPage) {
        await expect(previousPageButtonLocator).toBeEnabled();

        await previousPageButtonLocator.click();
      } else {
        await expect(previousPageButtonLocator).toBeDisabled();
      }
    }
  });
});

describe('When selected user does NOT exist', () => {
  test('Displays 404 page', async ({ page }) => {
    const { routes } = createContainer({
      page,
    });

    await routes.goToUserPage({ userId: 'some-fake-id', page: 1, perPage: 10 });

    await expect(page.getByText('This page could not be found.')).toBeVisible();
  });
});
