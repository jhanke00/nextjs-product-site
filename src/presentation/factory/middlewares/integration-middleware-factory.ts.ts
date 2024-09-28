import { IntegrationMiddleware } from '../../middlewares';

export const makeIntegrationMiddleware = () => {
  const integrationMiddleware = new IntegrationMiddleware();
  return integrationMiddleware;
};
