/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require('mongoose');
const fs = require('fs');

mongoose
  .connect('mongodb://admin:admin@localhost:27017/product_api?authSource=admin')
  .then(() => console.log('[MongoDB] Connected to MongoDB'))
  .catch((err) => console.error('[MongoDB] Failed to Connect', err));

const importData = async (model, dataPath, name) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  await model.insertMany(data);
  console.log(`[MongoDB] Import collection '${name}' from '${dataPath}'`);
};

const usersSchema = new mongoose.Schema({}, { strict: false });
const Users = mongoose.model('users', usersSchema);

const productsSchema = new mongoose.Schema({}, { strict: false });
const Products = mongoose.model('products', productsSchema);

const ordersSchema = new mongoose.Schema({}, { strict: false });
const Orders = mongoose.model('orders', ordersSchema);

const setupDatabase = async () => {
  try {
    await Users.deleteMany();
    await Products.deleteMany();
    await Orders.deleteMany();

    await importData(Users, './db/users.json', 'users');
    await importData(Products, './db/products.json', 'products');
    await importData(Orders, './db/orders.json', 'orders');

    console.log('[MongoDB] Data imported!');
  } catch (error) {
    console.error('[MongoDB] Failed on seed data', error);
  } finally {
    mongoose.connection.close();
  }
};

setupDatabase();
