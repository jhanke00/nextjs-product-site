// Types
import { ErrorCode } from './type';

export default class Exception extends Error {
  status: number;

  constructor(statusCode: ErrorCode, message: string) {
    super(message);
    this.status = statusCode;
  }
}
