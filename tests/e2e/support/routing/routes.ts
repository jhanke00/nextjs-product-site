import { pagesUrls } from '@/src/view/pages/pagesUrls';
import { Page } from '@playwright/test';

type Dependencies = {
  page: Page;
};

export const makeRoutes = ({ page }: Dependencies) => {
  const goToUserPage = (...params: Parameters<(typeof pagesUrls)['user']>) => page.goto(pagesUrls.user(...params));

  return { goToUserPage };
};
