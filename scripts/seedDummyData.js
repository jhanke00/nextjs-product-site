import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { faker } from '@faker-js/faker';
import { randomInt } from 'crypto';

dotenv.config({ path: './.env.local' });

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
console.log('Connected successfully to the database');

const db = client.db(process.env.DATABASE_NAME);

const loadProducts = async () => {
  const collection = db.collection('products');
  const products = [];

  for (let i = 0; i < 10000; i++) {
    const product = {
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      rating: faker.number.float({ min: 0, max: 5 }),
      numReviews: faker.number.int({ min: 0, max: 100 }),
      countInStock: faker.number.int({ min: 0, max: 100 }),
    };

    products.push(product);
  }
  await collection.insertMany(products);
  return products;
};

const loadUsers = async () => {
  const collection = db.collection('users');

  const users = [];

  for (let i = 0; i < 1000; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const user = {
      firstName,
      lastName,
      phoneNumber: faker.phone.number(),
      email: faker.internet.email({ firstName, lastName }),
    };

    users.push(user);
  }
  await collection.insertMany(users);
  return users;
};

const loadOrders = async (products, users) => {
  const collection = db.collection('orders');
  const orders = [];

  for (let i = 0; i < 50000; i++) {
    const items = [];
    let total = 0;

    for (let p = 0; p < randomInt(1, 10); p++) {
      const { _id, price } = products[randomInt(products.length)];
      const count = randomInt(1, 5);

      const item = { _id, count };

      items.push(item);
      total += price * count;
    }

    const order = {
      user: users[randomInt(users.length)]._id,
      items,
      total,
      time: faker.date.anytime(),
    };

    orders.push(order);
  }

  await collection.insertMany(orders);
};

const products = await loadProducts();
const users = await loadUsers();
await loadOrders(products, users);
await client.close();
