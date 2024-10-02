import './envConfig';
import jwt from 'jsonwebtoken';

const secretKey: string = process.env.JWT_SECRET! || 'secret';
const signOptions: jwt.SignOptions | undefined = { expiresIn: '1h' };
const saltOrRounds: number | string = 10;

if (secretKey === 'secret') {
  console.warn('Warning: Using default secret key, please define JWT_SECRET environment variable');
  // throw new Error('Please define the JWT_SECRET environment variable');
}

export { secretKey, signOptions, saltOrRounds };
