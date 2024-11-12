import usersSmallData from '../mock/small/users.json';
import usersLargeData from '../mock/large/users.json';
import { NextRequest } from 'next/server';
import { IsEmail, IsNotEmpty, validateSync } from 'class-validator';

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const users = [...usersSmallData, ...usersLargeData].flat();

type User = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password?: string;
};

export class SignupDto {
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @IsNotEmpty({ message: 'Password is required' })
  password!: string;

  @IsNotEmpty({ message: 'First name is required' })
  firstName!: string;

  @IsNotEmpty({ message: 'Last name is required' })
  lastName!: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  phoneNumber!: string;
}

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @IsNotEmpty({ message: 'Password is required' })
  password!: string;
}

/**
 * Finds a user by their id.
 * @param {string} id
 * @returns {User}
 */

export function getUserById(id: string) {
  return users.find((user) => user.id === id);
}

/**
 * Finds a user by their email.
 * @param {string} email
 * @returns {User}
 */
export function getUserByEmail(email: string): User | null {
  const user = users.find((user) => user.email === email) as User & { password?: string };
  if (user) {
    return { ...user, password: user.password || 'defaultPassword123' };
  }

  return null;
}

/**
 * Authorizes a user by email and password.
 * @param {LoginDto} dto
 * @returns {Object}
 */
export function login(dto: LoginDto) {
  const errors = validateSync(dto);
  if (errors.length > 0) {
    const messages = errors.map((err) => Object.values(err.constraints || {})).flat();
    return { success: false, message: messages.join(', ') };
  }

  const { email, password } = dto;

  const user: User | null = getUserByEmail(email);
  if (!user) return { success: false, token: null, message: 'Invalid credentials' };
  if (!user.password) {
    // In this scenario, the data set does not have passwords stored. So, login for mocked users will always work
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME });
    return { success: true, token: token };
  }

  if (isPasswordValid(password, user.password)) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME });
    return { success: true, token: token };
  }

  return { success: false, token: null, message: 'Invalid credentials' };
}

/**
 * Signs up a new user.
 * @param {SignupDto} dto
 * @returns {{ success: boolean, message: string }}
 */
export function signup(dto: SignupDto) {
  const errors = validateSync(dto);
  if (errors.length > 0) {
    const messages = errors.map((err) => Object.values(err.constraints || {})).flat();
    return { success: false, message: messages.join(', ') };
  }

  const { email, password, firstName, lastName, phoneNumber } = dto;

  const user = getUserByEmail(email);
  if (user) return { success: false, message: 'User already exists' };

  let hashedPassword = hashPassword(password);
  const newUser = {
    id: crypto.randomUUID(),
    email,
    password: hashedPassword,
    firstName,
    lastName,
    phoneNumber,
  };
  users.push(newUser);
  fs.writeFileSync('src/mock/small/users.json', JSON.stringify(users, null, 2));
  return { success: true };
}

/**
 * Hashes a password using SHA256.
 * @param {string} password
 * @returns {string} The hashed password
 */
const hashPassword = (password: string) => {
  const hashed = crypto.createHmac('sha256', process.env.KEY_SECRET).update(password).digest('hex');
  return hashed;
};

/**
 * Verifies if a given password matches the hashed password.
 * @param {string} password - The plain text password to verify.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {boolean} True if the password matches the hashed password, false otherwise.
 */
const isPasswordValid = (password: string, hashedPassword: string) => {
  return hashPassword(password) === hashedPassword;
};

/**
 * Validates a JSON Web Token (JWT) using the secret key stored in the environment variables.
 * @param {string} token - The JWT to validate.
 * @returns {boolean} True if the token is valid, false otherwise.
 */
export const validateJWT = (token: string) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Decodes a JSON Web Token (JWT) without verifying its signature.
 * @param {string} token - The JWT to decode.
 * @returns {} The decoded payload of the token or null if decoding fails.
 */
export const decodeJWT = (token: string) => {
  return jwt.decode(token);
};

/**
 * Verifies the authorization header of a request.
 * @param {Request | NextRequest} request - The request to verify the authorization header from.
 * @returns {{ success: boolean; message: string; id: string }} - An object containing a boolean indicating whether the authorization was successful, a message indicating the reason for failure if applicable, and the user ID if the authorization was successful.
 */
export function isAuthorized(request: Request | NextRequest) {
  const authorization = request.headers.get('authorization');
  if (!authorization) {
    return { success: false, message: 'No authorization header was provided' };
  }
  if (!validateJWT(authorization)) {
    return { success: false, message: 'Invalid token' };
  }

  const { id } = decodeJWT(authorization);

  return { success: true, id: id };
}
