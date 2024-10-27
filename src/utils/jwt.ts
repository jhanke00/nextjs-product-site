import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET as string;

export type ValidateJWTType = {
  id: string;
  iat: number;
  exp: number;
};

export const createJWT = (id: string): string => {
  return jwt.sign({ id }, secretKey, { expiresIn: '7d' });
};

export const validateJWT = (token: string): ValidateJWTType | void => {
  return jwt.verify(sanitizeToken(token), secretKey, (_err, decoded) => {
    if (!decoded) return false;
    return decoded;
  });
};

const sanitizeToken = (token: string): string => token.replace('Bearer ', '');
