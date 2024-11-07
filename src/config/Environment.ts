import { Values } from '../utils/Values';

export const Environments = {
  Development: 'Development',
  Production: 'Production',
} as const;

export type Environment = Values<typeof Environments>;
