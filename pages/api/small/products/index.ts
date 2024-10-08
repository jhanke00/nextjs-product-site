import type { NextApiRequest, NextApiResponse } from 'next';
import products from '@/src/mock/small/products.json';
import { IProduct } from '@/src/types/products';
import response from '@/src/utils/response';

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
      const convertedProducts: IProduct[] = products.map((product) => ({
        ...product,
        _id: product.id,
        price: Number(product.price),
      }));

      let filteredProducts: IProduct[] = [...convertedProducts];

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
        if (a[sort as keyof IProduct] < b[sort as keyof IProduct]) return -1 * orderMultiplier;
        if (a[sort as keyof IProduct] > b[sort as keyof IProduct]) return 1 * orderMultiplier;
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
      response.methodNotAllowed(res, req.method as string, ['GET']);
  }
}
