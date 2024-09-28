
import JwtHelper from '@/infra/authenticators/jwt/jwt-helper';
import { AuthMiddleware } from '../../middlewares/users-auth-middleware';

export const makeAuthMiddleware = () => {
  const jwtHelper = new JwtHelper();
  
  const authMiddleware = new AuthMiddleware(jwtHelper);
  return authMiddleware;
};
