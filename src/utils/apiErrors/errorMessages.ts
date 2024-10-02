interface ApiError {
  name: string;
  statusCode: number;
}

class ValidationError extends Error implements ApiError {
  name = 'ValidationError';
  statusCode = 400;

  constructor(message: string) {
    super(message);
  }
}

class UnauthorizedError extends Error implements ApiError {
  name = 'UnauthorizedError';
  statusCode = 401;

  constructor(message: string) {
    super(message);
  }
}

class NotFoundError extends Error implements ApiError {
  statusCode = 404;
  name = 'NotFoundError';

  constructor(message: string) {
    super(message);
  }
}

export type { ApiError };
export { NotFoundError, ValidationError, UnauthorizedError };
