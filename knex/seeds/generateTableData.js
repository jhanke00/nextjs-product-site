const { faker } = require('@faker-js/faker');
const { randomInt } = require('crypto');
const fs = require('fs');
const { UlidMonotonic } = require('id128');

function generateProducts() {
  const products = [];

  for (let i = 0; i < 10000; i++) {
    const product = {
      productId: UlidMonotonic.generate().toCanonical(),
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

  return products;
}

function generateUsers() {
  const users = [];

  for (let i = 0; i < 1000; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const user = {
      userId: UlidMonotonic.generate().toCanonical(),
      firstName,
      lastName,
      phoneNumber: faker.phone.number(),
      email: faker.internet.email({ firstName, lastName }),
    };

    users.push(user);
  }

  return users;
}

function generateOrders(users, products) {
  const orders = [];
  const orderProducts = [];

  for (let i = 0; i < 50000; i++) {
    const items = [];
    let total = 0;

    const orderId = UlidMonotonic.generate().toCanonical();
    for (let p = 0; p < randomInt(1, 10); p++) {
      const { productId, price } = products[randomInt(products.length)];
      const count = randomInt(1, 5);

      const productIndex = items.findIndex((item) => item.productId === productId);

      if (productIndex === -1) {
        const item = { orderId, productId, count };
        items.push(item);
      } else {
        const item = items[productIndex];
        item.count += count;
      }

      total += price * count;
    }

    const order = {
      orderId,
      userId: users[randomInt(users.length)].userId,
      total,
      time: faker.date.anytime(),
    };

    orders.push(order);
    orderProducts.push(...items);
  }

  return [orders, orderProducts];
}

export async function seed(knex) {
  await knex('order_products').del();
  await knex('orders').del();
  await knex('users').del();
  await knex('products').del();

  const products = generateProducts();
  const users = generateUsers();
  const [orders, orderProducts] = generateOrders(users, products);

  await knex.batchInsert('products', products);
  await knex.batchInsert('users', users);
  await knex.batchInsert('orders', orders);
  await knex.batchInsert('order_products', orderProducts);
}
