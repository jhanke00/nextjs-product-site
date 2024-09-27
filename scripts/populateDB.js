require('dotenv').config({ path: process.cwd() + '/.env.local' });
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { MongoClient } = require('mongodb');

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.MONGO_DB;

async function importData(collection, data) {
  await collection.deleteMany({});

  const BATCH_SIZE = 1000;

  for (let i = 0; i < data.length; i += BATCH_SIZE) {
    const batch = data.slice(i, i + BATCH_SIZE).map(async (item) => {
      const newItem = { ...item };

      // Map user id to _id and create a new hashed password field (firstName + 3 last digits of the phoneNumber)
      if (collection.collectionName === 'User') {
        const { id, email, ...rest } = newItem;
        const hashedPassword = await bcrypt.hash(`${item.firstName}${item.phoneNumber.slice(-3)}`, 10);
        return { ...rest, _id: id, password: hashedPassword, email: email.toLowerCase() };
      }

      // Map product id to _id and convert price to Number
      if (collection.collectionName === 'Product') {
        const { id, price, ...rest } = newItem;
        return { ...rest, _id: id, price: Number(price) };
      }

      // Add uuid to order _id field and convert item.price to Number
      if (collection.collectionName === 'Order') {
        const { items, ...rest } = newItem;

        const productItems = items.map((productItem) => ({
          ...productItem,
          price: Number(productItem.price),
        }));

        return { ...rest, _id: crypto.randomUUID(), items: productItems };
      }

      // For other future mock json files, return all fields
      return newItem;
    });

    const resolvedBatch = await Promise.all(batch);
    await collection.insertMany(resolvedBatch);
  }

  console.log(`Successully imported ${collection.collectionName} collection`);
}

async function populateDB() {
  const client = new MongoClient(MONGO_URI);

  console.log(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(DB_NAME);

    // Import Users
    const userCollection = db.collection('User');
    const userData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/mock/large/users.json'), 'utf8'));
    await importData(userCollection, userData);

    // Import Products
    const productCollection = db.collection('Product');
    const productData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/mock/large/products.json'), 'utf8'));
    await importData(productCollection, productData);

    // Import Orders
    const orderCollection = db.collection('Order');
    const orderData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/mock/large/orders.json'), 'utf8'));
    await importData(orderCollection, orderData);
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    await client.close();
  }
}

populateDB().catch((error) => console.error(error));
