import { Page } from '@playwright/test';
import { makeRoutes } from './routing/routes';

export type CreateContainerDependencies = {
  page: Page;
};

export const createContainer = ({ page }: CreateContainerDependencies) => {
  // When this grows we can use an automatic DI container
  // but for now, a manual one will do

  const routes = makeRoutes({ page });

  return { routes };
};
