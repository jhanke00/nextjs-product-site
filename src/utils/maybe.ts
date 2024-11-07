import { isDefined } from './isDefined';

export const maybe = <T, U>(value: T, operation: (value: NonNullable<T>) => U): Extract<T, undefined | null> | U => {
  if (!isDefined(value)) {
    return value as Extract<T, undefined | null>;
  }

  return operation(value);
};
