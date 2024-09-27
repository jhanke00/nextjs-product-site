import * as Yup from 'yup';

export type FormattedErrors = Record<string, string>;

export const formatValidationErrors = (errors: Yup.ValidationError): FormattedErrors => {
  const formattedErrors: FormattedErrors = {};

  errors.inner.forEach((error) => {
    const path = error.path as string;
    if (!formattedErrors[path]) {
      formattedErrors[path] = error.message;
    }
  });

  return formattedErrors;
};
