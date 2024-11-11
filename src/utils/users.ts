import usersSmallData from '../mock/small/users.json';
import usersLargeData from '../mock/large/users.json';
import { NextRequest } from 'next/server';

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const users = [...usersSmallData, ...usersLargeData].flat();

/**
 * @description
 * Finds a user by their id.
 * @param {string} id
 * @returns {User}
 */

export function getUserById(id: string) {
  return users.find((user) => user.id === id);
}

/**
 * @description
 * Finds a user by their email.
 * @param {string} email
 * @returns {User}
 */
export function getUserByEmail(email: string) {
  return users.find((user) => user.email === email);
}

/**
 * @description
 * Authorizes a user by email and password.
 * Returns an object with properties:
 * In this scenario, the data set does not have passwords stored. Use the "SampleP4ss" to every user instead.
 *   success: boolean, true if authorized, false otherwise
 *   token: string, the JWT token if authorized, null otherwise
 *   message: string, an error message if not authorized
 * @param {string} email
 * @param {string} password
 * @returns {Object}
 */
export function login(email: string, password: string) {
  const user = getUserByEmail(email);
  if (!user) return { success: false, token: null, message: 'Invalid credentials' };

  // In this scenario, the data set does not have passwords stored. Use the "SampleP4ss" to every user instead.
  // The error below "Property 'password' does not exist" occurs because the data set does not have passwords stored, the users created have
  if (isPasswordValid(password, user.password || '499a164871022109b218819ee945b9b494ca1b34bfb1f717a1f947d17c538d0e')) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return { success: true, token: token, message: '' };
  } else {
    return { success: false, token: null, message: 'Invalid credentials' };
  }
}

/**
 * @description
 * Registers a new user with the provided details. If a user with the given email already exists,
 * the function returns an error message. The password is hashed before storing. The new user is
 * added to the users list and persisted to a JSON file.
 *
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the user account.
 * @param {string} firstName - The first name of the user.
 * @param {string} lastName - The last name of the user.
 * @param {string} phoneNumber - The phone number of the user.
 *
 * @returns {Object} An object containing a success boolean and a message indicating the result.
 */
export function signup(email: string, password: string, firstName: string, lastName: string, phoneNumber: string) {
  if (!email) {
    return { success: false, message: 'Email is required' };
  }

  if (!password) {
    return { success: false, message: 'Password is required' };
  }

  if (!firstName) {
    return { success: false, message: 'First name is required' };
  }

  if (!lastName) {
    return { success: false, message: 'Last name is required' };
  }

  if (!phoneNumber) {
    return { success: false, message: 'Phone number is required' };
  }

  const user = getUserByEmail(email);
  if (user) return { success: false, message: 'User already exists' };

  let hashedPassword = hashPassword(password);
  const newUser = { id: crypto.randomUUID(), email, password: hashedPassword, firstName, lastName, phoneNumber };
  users.push(newUser);
  fs.writeFileSync('src/mock/small/users.json', JSON.stringify(users, null, 2));
  return { success: true, message: '' };
}

/**
 * @description
 * Hashes a password using SHA256.
 * @param {string} password
 * @returns {string} The hashed password
 */
const hashPassword = (password: string) => {
  const hashed = crypto.createHmac('sha256', process.env.KEY_SECRET).update(password).digest('hex');
  return hashed;
};

/**
 * @description
 * Verifies if a given password matches the hashed password.
 *
 * @param {string} password - The plain text password to verify.
 * @param {string} hashedPassword - The hashed password to compare against.
 *
 * @returns {boolean} True if the password matches the hashed password, false otherwise.
 */
const isPasswordValid = (password: string, hashedPassword: string) => {
  return hashPassword(password) === hashedPassword;
};

/**
 * @description
 * Validates a JSON Web Token (JWT) using the secret key stored in the environment variables.
 *
 * @param {string} token - The JWT to validate.
 *
 * @returns {boolean} True if the token is valid, false otherwise.
 */
export const validateJWT = (token: string) => {
  try {
    // For sake of testing, in this case, use the secret key as "sample-value"
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * @description
 * Decodes a JSON Web Token (JWT) without verifying its signature.
 *
 * @param {string} token - The JWT to decode.
 *
 * @returns {} The decoded payload of the token or null if decoding fails.
 */
export const decodeJWT = (token: string) => {
  return jwt.decode(token);
};

export function isAuthorized(request: Request | NextRequest): { success: boolean; message: string; id: string } {
  const authorization = request.headers.get('authorization');
  if (!authorization) {
    return { success: false, message: 'No authorization header was provided', id: '' };
  }
  if (!validateJWT(authorization)) {
    return { success: false, message: 'Invalid token', id: '' };
  }

  const { id } = decodeJWT(authorization);

  return { success: true, message: '', id: id };
}
