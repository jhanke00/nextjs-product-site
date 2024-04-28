import clientPromise from '../../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE_NAME);
    const tokens = req.url?.split('/');
    if (!tokens) {
      res.json({});
    } else {
      const _id = tokens[tokens?.length - 1];

      const oid = new ObjectId(_id);

      const product = await db.collection('products').findOne({ _id: oid });
      res.json(product);
    }
  } catch (e) {
    console.error(e);
  }
};
