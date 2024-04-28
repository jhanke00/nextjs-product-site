import clientPromise from '../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE_NAME);
    const limit = (req?.query?.limit as string) ?? '20';
    const skip = (req?.query?.skip as string) ?? '0';
    const productsCursor = db.collection('products').find({});
    const products = await productsCursor.limit(parseInt(limit)).skip(parseInt(skip)).toArray();
    res.json(products);
  } catch (e) {
    console.error(e);
  }
};
