import type { NextApiRequest, NextApiResponse } from 'next';
import products from '@/src/mock/small/products.json';
import { Product } from '@/src/type/products';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // Check the method in case we want to add a POST route as well to insert products
  switch (method) {
    case 'GET':
      const {
        order = 'asc',
        sort = 'name',
        search = '',
        categories = '',
        minPrice,
        maxPrice,
        minRating,
        maxRating,
        page = 1,
        limit = 10,
      } = req.query;

      // Convert price from string to number
      const convertedProducts: Product[] = products.map((product) => ({
        ...product,
        price: Number(product.price),
      }));

      let filteredProducts: Product[] = [...convertedProducts];

      if (search) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.name.toLowerCase().includes((search as string).toLowerCase()) ||
            product.category.toLowerCase().includes((search as string).toLowerCase()) ||
            product.description.toLowerCase().includes((search as string).toLowerCase())
        );
      }

      if (categories) {
        const categoryArray = (categories as string).split(',').map((category) => category.trim());
        filteredProducts = filteredProducts.filter((product) =>
          categoryArray.map((category) => category.toLowerCase()).includes(product.category.toLowerCase())
        );
      }

      if (minPrice) {
        filteredProducts = filteredProducts.filter((product) => product.price >= Number(minPrice));
      }
      if (maxPrice) {
        filteredProducts = filteredProducts.filter((product) => product.price <= Number(maxPrice));
      }

      if (minRating) {
        filteredProducts = filteredProducts.filter((product) => product.rating >= Number(minRating));
      }
      if (maxRating) {
        filteredProducts = filteredProducts.filter((product) => product.rating <= Number(maxRating));
      }

      const orderMultiplier = order === 'desc' ? -1 : 1;
      filteredProducts.sort((a, b) => {
        if (a[sort as keyof Product] < b[sort as keyof Product]) return -1 * orderMultiplier;
        if (a[sort as keyof Product] > b[sort as keyof Product]) return 1 * orderMultiplier;
        return 0;
      });

      const totalCount = filteredProducts.length;
      const startIndex = (Number(page) - 1) * Number(limit);
      const endIndex = startIndex + Number(limit);
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      res.status(200).json({
        products: paginatedProducts,
        totalCount,
        totalPages: Math.ceil(totalCount / Number(limit)),
        currentPage: Number(page),
      });
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
