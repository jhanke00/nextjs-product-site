/* eslint-disable no-unused-vars */

export interface IPasswordsManager {
  hashPassword(password: string): Promise<string>;
  comparePasswords(candidatePassword: string, hashedPassword: string): Promise<boolean>;
}
