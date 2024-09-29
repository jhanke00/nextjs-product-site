/* eslint-disable no-unused-vars */

export interface IAuthenticator {
  createNewToken(input: object): Promise<string | undefined>;
  verifyToken<T>(input: string): Promise<{isValid: boolean, data: T}>;
}
