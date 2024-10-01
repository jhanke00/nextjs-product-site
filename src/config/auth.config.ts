import './envConfig';
import jwt from 'jsonwebtoken';

const secretKey: string = process.env.JWT_SECRET!;
const signOptions: jwt.SignOptions | undefined = { expiresIn: '1h' };
const saltOrRounds: number | string = 10;

if (!secretKey) {
  throw new Error('Please define the JWT_SECRET environment variable');
}

export { secretKey, signOptions, saltOrRounds };
