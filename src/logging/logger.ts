import { env } from '../config/env';
import { Environment } from '../config/Environment';

const prodLogger = {
  debug: (message: string, context?: object) => {
    console.log(message, context);

    // Log to monitoring service (e.g. Sentry, Rollbar, Kibana)
  },
  error: (value: string | Error, context?: object) => {
    console.error(value, context);

    // Log to monitoring service (e.g. Sentry, Rollbar, Kibana)
  },
};

const devLogger = {
  debug: (message: string, context?: object) => {
    console.log(message, context);
  },
  error: (value: string | Error, context?: object) => {
    console.error(value, context);
  },
};

type Logger = {
  debug: (message: string, context?: object) => void;
  error: (value: string | Error, context?: object) => void;
};

const loggerMatrix: Record<Environment, Logger> = {
  Development: devLogger,
  Production: prodLogger,
};

export const logger = loggerMatrix[env.NEXT_PUBLIC_ENVIRONMENT];
