import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables from .env file
import Products from '../../src/mock/large/products.json' assert { type: 'json' };
import Users from '../../src/mock/large/users.json' assert { type: 'json' };
import Orders from '../../src/mock/large/orders.json' assert { type: 'json' };
dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017';
const dbName = process.env.DB_NAME || 'mydatabase';

async function seedDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB for seeding');

    const db = client.db(dbName);
    const collection = db.collection('products');
    const userCollection = db.collection('users');
    const orderCollection = db.collection('orders');

    const result = await collection.insertMany(Products);
    const userResult = await userCollection.insertMany(Users);
    const ordeResult = await orderCollection.insertMany(Orders);
    console.log(`Sucessfully Inserted ${result.insertedCount} products`);
    console.log(`Sucessfully Inserted ${userResult.insertedCount} users`);
    console.log(`Sucessfully Inserted ${ordeResult.insertedCount} orders`);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedDatabase().catch(console.error);
