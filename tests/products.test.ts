import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/products'; // Adjust this path to your API file
import largeData from '@/src/mock/large/products.json';
import smallData from '@/src/mock/small/products.json';
import { Product } from '@/src/type/products';
import { NextApiRequest, NextApiResponse } from 'next';

describe('API /api/products', () => {
  it('should return all products when no filters are applied', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    });

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.length).toBe(largeData.length + smallData.length);
  });

  it('should filter products by category', async () => {
    const testCategory = 'electronics'; // Replace with a category in your data
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: {
        category: testCategory,
      },
    });

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res._getData()) as Product[];
    expect(data.every((product) => product.category === testCategory)).toBe(true);
  });

  it('should filter products by rating', async () => {
    const testRating = '4'; // Example rating to test
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: {
        rating: testRating,
      },
    });

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res._getData()) as Product[];
    expect(data.every((product) => product.rating.toFixed(2).split('.')[0] === testRating)).toBe(true);
  });

  it('should filter products by min and max price', async () => {
    const minPrice = 10;
    const maxPrice = 100;
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: {
        minprice: minPrice.toString(),
        maxprice: maxPrice.toString(),
      },
    });

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res._getData()) as Product[];
    expect(data.every((product) => product.price >= minPrice && product.price <= maxPrice)).toBe(true);
  });

  it('should return 404 for unsupported methods', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST', // Using an unsupported method
    });

    await handler(req, res);

    expect(res.statusCode).toBe(404);
  });
});
