import usersSmallData from '../mock/small/users.json';
import usersLargeData from '../mock/large/users.json';

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

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
export function authorize(email: string, password: string) {
  const user = getUserByEmail(email);
  if (!user) return { success: false, token: null, message: 'Invalid credentials' };

  // In this scenario, the data set does not have passwords stored. Use the "SampleP4ss" to every user instead.
  if (
    isPasswordValid(password, '499a164871022109b218819ee945b9b494ca1b34bfb1f717a1f947d17c538d0e' /* user.password */)
  ) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return { success: true, token: token, message: '' };
  } else {
    return { success: false, token: null, message: 'Invalid credentials' };
  }
}

/**
 * @description
 * Hashes a password using SHA256.
 * @param {string} password
 * @returns {string} The hashed password
 */
const hashPassword = (password: string) => {
  return crypto.createHash('sha256').update(password).digest('hex');
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
