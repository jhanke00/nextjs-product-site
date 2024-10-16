const { faker } = require('@faker-js/faker');
const { randomInt } = require('crypto');
const fs = require('fs');

function generateProducts() {
  const products = [];

  for (let i = 0; i < 25; i++) {
    const product = {
      PutRequest: {
        Item: {
          id: { S: faker.string.uuid() },
          name: { S: faker.commerce.productName() },
          price: { N: faker.commerce.price() },
          description: { S: faker.commerce.productDescription() },
          category: { S: faker.commerce.department() },
          rating: { N: faker.number.float({ min: 0, max: 5 }).toString() },
          numReviews: { N: faker.number.int({ min: 0, max: 100 }).toString() },
          countInStock: { N: faker.number.int({ min: 0, max: 100 }).toString() },
        },
      },
    };

    products.push(product);
  }

  return products;
}

// Generate Users and Orders (assuming you don't need to change these for now)
function generateUsers() {
  const users = [];

  for (let i = 0; i < 25; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const user = {
      id: faker.string.uuid(),
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

  for (let i = 0; i < 50000; i++) {
    const items = [];
    let total = 0;

    for (let p = 0; p < randomInt(1, 10); p++) {
      const { id, name, price } = products[randomInt(products.length)];
      const count = randomInt(1, 5);

      const item = { id, name, price, count };

      items.push(item);
      total += price * count;
    }

    const order = {
      user: users[randomInt(users.length)].id,
      items,
      total,
      time: faker.date.anytime(),
    };

    orders.push(order);
  }

  return orders;
}

// Generate Data
const products = generateProducts();
const users = generateUsers();
const orders = generateOrders(users, products);

// Convert to JSON
// const pJSON = JSON.stringify({ [`${process.env.DYNAMO_DB_TABLE_PREFIX}-Products`] : products }, null, 2);
const pJSON = JSON.stringify({ 'BCS_Next-Product-Site-Products': products }, null, 2);
const uJSON = JSON.stringify(users, null, 2);
const oJSON = JSON.stringify(orders, null, 2);

// Write to files
fs.writeFileSync('src/mock/small/products-dynamodb.json', pJSON);
console.log('DynamoDB Products Generated!');

fs.writeFileSync('src/mock/small/users-dynamo.json', uJSON);
console.log('Users Generated!');

fs.writeFileSync('src/mock/small/orders-dynamo.json', oJSON);
console.log('Orders Generated!');
