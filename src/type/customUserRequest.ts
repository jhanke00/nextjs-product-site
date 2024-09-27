import { NextApiRequest } from 'next';

export interface CustomNextApiUserRequest extends NextApiRequest {
  userId?: { id: string };
}
