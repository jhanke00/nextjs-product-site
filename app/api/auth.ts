import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { faker } from '@faker-js/faker';
import { validateInput } from '../../src/utils/validate.ts';

interface User {
  id: string;
  email: string;
  passwordHash: string;
  phoneNumber: number;
  firstName: string;
  lastName: string;
}

const usersFilePath = './src/mock/small/customUsers.json';
const secretKey = '4a5209991672117414473deeab7c4f3d1af691676c6b5e4dba6de197fd08e86e'; // Replace with a strong secret

export async function authRoutes(app: express.Application) {
  // reads user data from the specified customUsers.json file.
  async function getUsersData(): Promise<User[]> {
    try {
      const data = await fs.readFile(usersFilePath, 'utf-8');
      return JSON.parse(data) as User[];
    } catch (error) {
      console.error('Error reading users.json:', error);
      throw error;
    }
  }
  // write user data to customUsers.json file.
  async function saveUserData(users: User[]): Promise<void> {
    try {
      await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
    } catch (error) {
      console.error('Error saving users.json:', error);
      throw error;
    }
  }

  // API endpoint for user signup
  app.post('/user/signup', async (req, res) => {
    const { phoneNumber, email, password, firstName, lastName } = req.body;
    try {
      const validationError = validateInput({ phoneNumber, email, password, firstName, lastName });
      if (validationError) {
        return res.status(400).json(validationError);
      }
      const users = await getUsersData();
      if (users.find((user) => user.phoneNumber === phoneNumber || user.email === email)) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser: User = {
        id: faker.string.uuid(),
        phoneNumber,
        email,
        firstName,
        lastName,
        passwordHash: hashedPassword,
      };
      users.push(newUser);
      await saveUserData(users);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error signing up user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // API endpoint for user login
  app.post('/user/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const users = await getUsersData();
      const user = users.find((user) => user.email === email);
      if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
      res.json({ token });
      return true;
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
}
