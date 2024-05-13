import jwt, { JwtPayload } from 'jsonwebtoken';

export function verifyJwt(token: string) {
  try {
    const secretKey = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secretKey as any);
    return decoded as JwtPayload;
  } catch (error) {
    console.error('Unable to verify token: ' + error);
  }
}
