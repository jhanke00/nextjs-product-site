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
      const orderCursor = db.collection('orders').find({ 'items._id': { $eq: oid } });
      const orders = await orderCursor.limit(20).toArray();
      let similarItems: ObjectId[] = [];
      orders.forEach((o) => {
        o.items.map((i: any) => {
          if (i._id.toString() !== oid.toString()) similarItems.push(i._id);
        });
      });
      const similarProducts = await db
        .collection('products')
        .find({ _id: { $in: similarItems } })
        .limit(20)
        .toArray();

      res.json({ product, similarProducts });
    }
  } catch (e) {
    console.error(e);
  }
};
