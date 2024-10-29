/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require('mongoose');
const fs = require('fs');

mongoose
  .connect('mongodb://admin:admin@localhost:27017/product_api?authSource=admin')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar:', err));

const importData = async (model, dataPath) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  await model.insertMany(data);
  console.log(`Dados importados de ${dataPath}`);
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

    await importData(Users, './db/users.json');
    await importData(Products, './db/products.json');
    await importData(Orders, './db/orders.json');

    console.log('Banco de dados configurado e dados importados!');
  } catch (error) {
    console.error('Erro ao configurar o banco de dados:', error);
  } finally {
    mongoose.connection.close();
  }
};

setupDatabase();
