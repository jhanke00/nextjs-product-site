import * as mongodb from 'mongodb';
import { Order } from '../type/orders';
import { Product } from '../type/products';
import { User } from '../type/users';

export const collections: {
  orders?: mongodb.Collection<Order>;
  products?: mongodb.Collection<Product>;
  users?: mongodb.Collection<User>;
} = {};

export async function connectToDatabase(uri?: string) {
  if (!uri || typeof uri !== 'string') {
    throw new Error('Database URI is not defined');
  }

  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db(process.env.DATABASE_NAME);

  const productCollection = db.collection<Product>('products');
  const userCollection = db.collection<User>('users');
  const orderCollection = db.collection<Order>('orders');

  collections.orders = orderCollection;
  collections.products = productCollection;
  collections.users = userCollection;

  return client;
}
