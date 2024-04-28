import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const strFind = (req?.query?.term as string) ?? '';
    const products = await searchProduct(strFind);
    res.json(products);
  } catch (e) {
    console.error(e);
  }
};

const searchProduct = async (query: string): Promise<any[]> => {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME);
  const products = await db
    .collection('products')
    .find({
      $or: [{ name: { $regex: new RegExp(query, 'i') } }],
    })
    .limit(20)
    .toArray();
  return products;
};
