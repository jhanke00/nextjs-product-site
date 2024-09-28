/* eslint-disable no-unused-vars */

export interface IAuthenticator {
  createNewToken(input: object): Promise<string | undefined>;
  verifyToken(input: string): Promise<boolean>;
}
