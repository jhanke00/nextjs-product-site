export type IHttpResponse = {
  statusCode: number;
  body: any;
};

const extractErrorData = (error: Error) => ({
  message: error.message,
  name: error.name,
  stack: error.stack,
});

export const badRequest = (error: Error): IHttpResponse => {
  return {
    statusCode: 400,
    body: extractErrorData(error),
  };
};

export const ok = (data: any): IHttpResponse => ({
  statusCode: 200,
  body: data,
});

export const unauthorized = (): IHttpResponse => ({
  statusCode: 401,
  body: extractErrorData({
    message: 'Unauthorized',
    name: "INVALID_TOKEN"
  }),
});
