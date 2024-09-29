import { IAuthenticator } from '@/src/domain/authenticators/authenticator';
import { IUser } from '@/src/domain/models';
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

  async createNewToken(user: IUser) {
    return sign({
      email: user.email,  
    }, JWT_SECRET, this.options);
  }

  async verifyToken<T>(token: string): Promise<{ isValid: boolean; data: T; }> {
    const data = verify(token, JWT_SECRET) as T
    return {
      isValid: data ? true : false,
      data
    }
  }
}
