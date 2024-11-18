import request from 'supertest';
import { createServer } from 'http';
import { NextRequest } from 'next/server';
import { GET } from '@/app/api/user/[id]/route';
import path from 'path';
import fs from 'fs';

jest.mock('fs');
jest.mock('path');

const mockServer = (handler: typeof GET) =>
  createServer(async (req, res) => {
    const url = new URL(req.url || '', 'http://localhost');
    const nextReq = new NextRequest(url, { method: req.method || 'GET' });
    const nextRes = await handler(nextReq);
    res.statusCode = nextRes.status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(await nextRes.json()));
  });

describe('GET /api/user/:id', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should return 400 if ID is not provided', async () => {
    const server = mockServer(GET);

    const response = await request(server).get('/api/user/');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'ID is required' });

    server.close();
  });

  it('Should return 404 if ID is not found', async () => {
    const mockFilePath = 'src/mock/small/users.json';

    (path.resolve as jest.Mock).mockReturnValue(mockFilePath);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify([{ id: '2', name: 'Jane Doe' }]));

    const server = mockServer(GET);

    const response = await request(server).get('/api/user/1');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'User not found' });

    server.close();
  });

  it('Should return 200 with user data if user found', async () => {
    const mockFilePath = 'src/mock/small/users.json';

    (path.resolve as jest.Mock).mockReturnValue(mockFilePath);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify([{ id: '1', name: 'John Doe' }]));

    const server = mockServer(GET);

    const response = await request(server).get('/api/user/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: '1', name: 'John Doe' });

    server.close();
  });

  it('Should return 500 throws', async () => {
    (path.resolve as jest.Mock).mockImplementation(() => {
      throw new Error('Simulated error');
    });

    const server = mockServer(GET);

    const response = await request(server).get('/api/user/1');

    expect(response.status).toBe(500);
    expect(response.body).toMatchObject({
      message: 'Something went wrong...',
      error: expect.anything(),
    });

    server.close();
  });
});
