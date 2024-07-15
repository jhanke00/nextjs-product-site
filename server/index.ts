import express, { Express, Request, Response } from 'express';

import { userRoutes } from '../app/api/user.ts';

const app = express();
const port = process.env.PORT || 8000; // Use environment variable for port

app.use(express.json()); // Parse incoming JSON data

userRoutes(app); // Mount user routes

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
