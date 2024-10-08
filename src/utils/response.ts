import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import { NextApiResponse } from 'next';

type FormattedErrors = Record<string, string>;

const formatValidationErrors = (errors: Yup.ValidationError): FormattedErrors => {
  const formattedErrors: FormattedErrors = {};

  errors.inner.forEach((error) => {
    const path = error.path as string;

    if (!formattedErrors[path]) {
      formattedErrors[path] = error.message;
    }
  });

  return formattedErrors;
};

export const methodNotAllowed = (res: NextApiResponse, method: string, methodsAllowed: string[]) => {
  res.setHeader('Allow', methodsAllowed);
  res.status(405).end(`Method ${method} Not Allowed`);
};

export const error = (res: NextApiResponse, error: Error) => {
  if (error instanceof jwt.TokenExpiredError) {
    res.status(401).json({
      code: 'AccessTokenExpired',
      message: 'Access token expired',
    });
  } else if (error instanceof jwt.JsonWebTokenError) {
    res.status(401).json({
      code: 'AccessTokenInvalid',
      message: 'Access token invalid',
    });
  } else if (error instanceof Yup.ValidationError) {
    const formattedErrors: FormattedErrors = formatValidationErrors(error);

    res.status(422).json({
      code: 'ValidationError',
      message: formattedErrors,
    });
  } else {
    let message = 'Internal Server Error. Please try again.';

    if (process.env.NODE_ENV === 'development') {
      message = error.message;
    }

    res.status(500).json({ message });
  }
};

export default {
  methodNotAllowed,
  error,
};
