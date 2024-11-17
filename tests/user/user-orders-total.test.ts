import request from 'supertest';
import { createServer } from 'http';
import { NextRequest } from 'next/server';
import { GET } from '@/app/api/user/[id]/orders/total/route';
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

describe('GET /api/user/:id/orders/total', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should return 400 if ID is not provided', async () => {
    const server = mockServer(GET);

    const response = await request(server).get('/api/user//orders/total');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'ID is required' });

    server.close();
  });

  it('Should return 200 with total if orders found', async () => {
    const mockFilePath = 'src/mock/small/orders.json';

    (path.resolve as jest.Mock).mockReturnValue(mockFilePath);
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify([
        { user: 'user-123', total: 100.0 },
        { user: 'user-123', total: 200.5 },
        { user: 'user-456', total: 300.0 },
      ])
    );

    const server = mockServer(GET);

    const response = await request(server).get('/api/user/user-123/orders/total');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ total: 300.5 });

    server.close();
  });

  it('Should return 200 with total 0 if no orders found', async () => {
    const mockFilePath = 'src/mock/small/orders.json';

    (path.resolve as jest.Mock).mockReturnValue(mockFilePath);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify([{ user: 'user-456', total: 300.0 }]));

    const server = mockServer(GET);

    const response = await request(server).get('/api/user/user-123/orders/total');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ total: 0 });

    server.close();
  });

  it('Should return 500 if throws', async () => {
    (path.resolve as jest.Mock).mockImplementation(() => {
      throw new Error('Simulated error');
    });

    const server = mockServer(GET);

    const response = await request(server).get('/api/user/user-123/orders/total');

    expect(response.status).toBe(500);
    expect(response.body).toMatchObject({
      message: 'Something went wrong...',
      error: expect.anything(),
    });

    server.close();
  });
});
