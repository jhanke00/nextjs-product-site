import { cleanEnv, str } from 'envalid';
import { Environments } from './Environment';

const rawEnv = {
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL!,
  NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT!,
  NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL!,
} satisfies Record<string, string>;

const schema = {
  NEXT_PUBLIC_API_BASE_URL: str(),
  NEXT_PUBLIC_ENVIRONMENT: str({ choices: Object.values(Environments) }),
  NEXT_PUBLIC_APP_BASE_URL: str(),
};

export const env = cleanEnv(rawEnv, schema);
