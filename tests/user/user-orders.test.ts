import request from 'supertest';
import { createServer } from 'http';
import { NextRequest } from 'next/server';
import { GET } from '@/app/api/user/[id]/orders/route';
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

describe('GET /api/user/:id/orders', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should return 400 if ID is not provided', async () => {
    const server = mockServer(GET);

    const response = await request(server).get('/api/user//orders');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'ID is required' });

    server.close();
  });

  it('Should return 404 if ID is not found', async () => {
    const mockFilePath = 'src/mock/small/orders.json';

    (path.resolve as jest.Mock).mockReturnValue(mockFilePath);
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify([
        {
          user: 'user-123',
          items: [],
          total: 0,
          time: '2024-04-01T10:00:00.000Z',
        },
      ])
    );

    const server = mockServer(GET);

    const response = await request(server).get('/api/user/user-456/orders');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Orders not found' });

    server.close();
  });

  it('Should 200 with user orders data if founds', async () => {
    const mockFilePath = 'src/mock/small/orders.json';

    (path.resolve as jest.Mock).mockReturnValue(mockFilePath);
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify([
        {
          user: 'user-123',
          items: [
            {
              id: 'item-001',
              name: 'Ergonomic Wooden Chair',
              price: '199.99',
              count: 2,
            },
            {
              id: 'item-002',
              name: 'Modern Steel Lamp',
              price: '89.50',
              count: 1,
            },
          ],
          total: 489.48,
          time: '2024-04-01T10:30:00.000Z',
        },
        {
          user: 'user-456',
          items: [
            {
              id: 'item-003',
              name: 'Soft Cotton Blanket',
              price: '45.00',
              count: 3,
            },
          ],
          total: 135.0,
          time: '2024-04-02T12:45:00.000Z',
        },
      ])
    );

    const server = mockServer(GET);

    const response = await request(server).get('/api/user/user-123/orders');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        user: 'user-123',
        items: [
          {
            id: 'item-001',
            name: 'Ergonomic Wooden Chair',
            price: '199.99',
            count: 2,
          },
          {
            id: 'item-002',
            name: 'Modern Steel Lamp',
            price: '89.50',
            count: 1,
          },
        ],
        total: 489.48,
        time: '2024-04-01T10:30:00.000Z',
      },
    ]);

    server.close();
  });

  it('Should return 500 if throws', async () => {
    (path.resolve as jest.Mock).mockImplementation(() => {
      throw new Error('Simulated error');
    });

    const server = mockServer(GET);

    const response = await request(server).get('/api/user/user-123/orders');

    expect(response.status).toBe(500);
    expect(response.body).toMatchObject({
      message: 'Something went wrong...',
      error: expect.anything(),
    });

    server.close();
  });
});
