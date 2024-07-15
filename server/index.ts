import express, { Express, Request, Response } from 'express';

import { userRoutes } from '../app/api/user.ts';

import { userRoutesLarge } from '../app/api/userLargeSet.ts';
import { authRoutes } from '../app/api/auth.ts';

const app = express();
const port = process.env.PORT || 8000; // Use environment variable for port

app.use(express.json()); // Parse incoming JSON data

userRoutes(app); // Mount user routes
userRoutesLarge(app);
authRoutes(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
