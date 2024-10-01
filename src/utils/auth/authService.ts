import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { secretKey, signOptions, saltOrRounds } from '@config/auth.config';
import { ValidationError } from '../apiErrors';

function isUUID(value: string) {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(value);
}

function validateUUID(value: string) {
  if (!isUUID(value)) throw new ValidationError('Invalid UUID');
}

function generateToken(userId: string): string {
  if (!userId) {
    throw new ValidationError('User id is required to generate token');
  }
  validateUUID(userId);

  return jwt.sign({ userId }, secretKey, signOptions);
}

async function validatePassword(inputPassword: string, userPassword: string): Promise<boolean> {
  if (!inputPassword || !userPassword) {
    throw new ValidationError('Input password and user password are required to validate password');
  }

  return bcrypt.compare(inputPassword, userPassword);
}

async function generatePasswordHash(password: string): Promise<string> {
  if (!password || password === '') {
    throw new ValidationError('Password is required to generate password hash');
  }

  return bcrypt.hash(password, saltOrRounds);
}

export { validateUUID, generateToken, validatePassword, generatePasswordHash };
