import { NextApiRequest } from 'next';

export interface CustomNextApiRequest extends NextApiRequest {
  userId?: { id: string };
}
