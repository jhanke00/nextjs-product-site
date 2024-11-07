import { env } from '../../config/env';
import ky, { HTTPError } from 'ky';

export const apiHttpClient = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_BASE_URL,
});

export const isHttpError = (value: unknown): value is HTTPError => {
  return value instanceof HTTPError;
};

// Remove leading slash to make KY happy
export const removeLeadingSlash = (path: string) => path.slice(1);
