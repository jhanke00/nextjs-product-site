import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { User } from '../models/User';
import { ApiError } from '../models/Error';

export default function handler(req: NextApiRequest, res: NextApiResponse<User | ApiError>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed', status: 405 });
  }
  try {
    const rawBody = req.body; // Access raw body data
    const usersPath = path.join(process.cwd(), 'public/data', 'users.json');
    const usersData = fs.readFileSync(usersPath);
    const users: User[] = JSON.parse(usersData.toString());
    const userId = parseInt(rawBody.userId as string, 10);
    if (!userId) {
      return res.status(400).json({ message: 'user id is required', status: 400 });
    }
    const user = users.find((user) => user.id === userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found', status: 404 });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', status: 500 });
  }
}
