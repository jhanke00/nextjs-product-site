export interface IError {
  statusCode: number;
  code?: string;
  message: string | object;
}
