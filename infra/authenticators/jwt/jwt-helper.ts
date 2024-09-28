import { IAuthenticator } from '@/src/domain/authenticators/authenticator';
import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

interface JwtOptions {
  expiresIn?: string;
}

const defaultOptions: JwtOptions = {
  expiresIn: '1d',
};

export default class JwtHelper implements IAuthenticator {
  private readonly options: JwtOptions;

  constructor(options?: JwtOptions) {
    this.options = options || defaultOptions;
  }

  async createNewToken(value: string) {
    return sign(value, JWT_SECRET, this.options);
  }

  async verifyToken(token: string) {
    return verify(token, JWT_SECRET) ? true : false;
  }
}
