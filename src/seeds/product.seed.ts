import { Product } from '@type/products';
import largeData from '@mock/large/products.json';
import smallData from '@mock/small/products.json';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const productSeed = async () => {
  const data: Product[] = [...largeData, ...smallData] as unknown as Product[];
  const products = data.map((product) => {
    return {
      name: product.name,
      description: product.description,
      category: product.category,
      rating: Number(product.rating),
      numReviews: Number(product.numReviews),
      countInStock: Number(product.countInStock),
      price: Number(product.price),
    };
  });

  await prisma.product.createMany({ data: products });

  console.log('Mock data migrated successfully!');
};
