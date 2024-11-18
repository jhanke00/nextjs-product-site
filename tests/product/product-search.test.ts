import request from 'supertest';
import { createServer } from 'http';
import { NextRequest } from 'next/server';
import { GET } from '@/app/api/product/search/route';
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

describe('GET /api/product/search', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should return 400 if no search term is provided', async () => {
    const server = mockServer(GET);

    const response = await request(server).get('/api/product/search');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Search term is required' });

    server.close();
  });

  it('Should return 404 if no products match the search term', async () => {
    const mockFilePath = 'src/mock/small/products.json';

    (path.resolve as jest.Mock).mockReturnValue(mockFilePath);
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify([
        { id: '1', name: 'Product A', countInStock: 10 },
        { id: '2', name: 'Product B', countInStock: 5 },
      ])
    );

    const server = mockServer(GET);

    const response = await request(server).get('/api/product/search?q=Z');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'No product found' });

    server.close();
  });

  it('Should return 200 with matching products', async () => {
    const mockFilePath = 'src/mock/small/products.json';

    (path.resolve as jest.Mock).mockReturnValue(mockFilePath);
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify([
        { id: '1', name: 'Product A', countInStock: 10 },
        { id: '2', name: 'Product B', countInStock: 5 },
        { id: '3', name: 'Product C', countInStock: 0 },
      ])
    );

    const server = mockServer(GET);

    const response = await request(server).get('/api/product/search?q=Product');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: '1', name: 'Product A', countInStock: 10 },
      { id: '2', name: 'Product B', countInStock: 5 },
      { id: '3', name: 'Product C', countInStock: 0 },
    ]);

    server.close();
  });

  it('Should return 500 if throws', async () => {
    (path.resolve as jest.Mock).mockImplementation(() => {
      throw new Error('Simulated error');
    });

    const server = mockServer(GET);

    const response = await request(server).get('/api/product/search?q=Product');

    expect(response.status).toBe(500);
    expect(response.body).toMatchObject({
      message: 'Something went wrong...',
      error: expect.anything(),
    });

    server.close();
  });
});
