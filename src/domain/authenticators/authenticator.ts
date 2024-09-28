/* eslint-disable no-unused-vars */

export interface IAuthenticator {
  createNewToken(input: string): Promise<string | undefined>;
  verifyToken(input: string):  Promise<boolean>
}
