import { IPasswordsManager } from '@/src/domain/authenticators/passwords-manager';
import bcrypt from 'bcryptjs';

export default class BcryptHelper implements IPasswordsManager {
  private readonly saltAmount: number;

  constructor(saltAmount?: number) {
    // Note: For testing purposes, a salt of 6 is good, but for production, i recommend 10.
    this.saltAmount = saltAmount || 6;
  }
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltAmount);
    return await bcrypt.hash(password, salt);
  }

  async comparePasswords(candidatePassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}
