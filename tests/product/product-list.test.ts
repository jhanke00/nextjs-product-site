import request from 'supertest';
import { createServer } from 'http';
import { NextRequest } from 'next/server';
import { GET } from '@/app/api/product/route';
import path from 'path';
import fs from 'fs';

jest.mock('fs');
jest.mock('path');

const mockServer = (handler: typeof GET) =>
  createServer(async (req, res) => {
    const url = new URL(req.url || '', 'http://localhost');
    new NextRequest(url, { method: req.method || 'GET' });
    const nextRes = await handler();
    res.statusCode = nextRes.status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(await nextRes.json()));
  });

describe('GET /api/product', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should return 200 with products in stock', async () => {
    const mockFilePath = 'src/mock/small/products.json';

    (path.resolve as jest.Mock).mockReturnValue(mockFilePath);
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify([
        { id: '1', name: 'Product 1', countInStock: 5 },
        { id: '2', name: 'Product 2', countInStock: 0 },
        { id: '3', name: 'Product 3', countInStock: 3 },
      ])
    );

    const server = mockServer(GET);

    const response = await request(server).get('/api/product');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: '1', name: 'Product 1', countInStock: 5 },
      { id: '3', name: 'Product 3', countInStock: 3 },
    ]);

    server.close();
  });

  it('Should return 200 with an empty array if no products are in stock', async () => {
    const mockFilePath = 'src/mock/small/products.json';

    (path.resolve as jest.Mock).mockReturnValue(mockFilePath);
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify([
        { id: '1', name: 'Product 1', countInStock: 0 },
        { id: '2', name: 'Product 2', countInStock: 0 },
      ])
    );

    const server = mockServer(GET);

    const response = await request(server).get('/api/product');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);

    server.close();
  });

  it('Should return 500 if throws', async () => {
    (path.resolve as jest.Mock).mockImplementation(() => {
      throw new Error('Simulated error');
    });

    const server = mockServer(GET);

    const response = await request(server).get('/api/product');

    expect(response.status).toBe(500);
    expect(response.body).toMatchObject({
      message: 'Something went wrong...',
      error: expect.anything(),
    });

    server.close();
  });
});
