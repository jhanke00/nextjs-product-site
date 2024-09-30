import { PrismaClient } from '@prisma/client';

import { convertUuidToObjectId } from '../src/utils/prisma/seed/convertUuidToObjectId';

import productsData from '../src/mock/small/products.json';
import ordersData from '../src/mock/small/orders.json';
import usersData from '../src/mock/small/users.json';

const prisma = new PrismaClient();

async function seed() {
  for (const user of usersData) {
    await prisma.user.create({
      data: {
        id: convertUuidToObjectId(user.id),
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
      },
    });
  }

  for (const product of productsData) {
    await prisma.product.create({
      data: {
        id: convertUuidToObjectId(product.id),
        name: product.name,
        price: parseFloat(product.price),
        description: product.description,
        category: product.category,
        rating: product.rating,
        numReviews: product.numReviews,
        countInStock: product.countInStock,
      },
    });
  }

  for (const order of ordersData) {
    const createdOrder = await prisma.order.create({
      data: {
        userId: convertUuidToObjectId(order.user),
        total: order.total,
        time: new Date(order.time),
      },
    });

    for (const item of order.items) {
      await prisma.orderItem.create({
        data: {
          orderId: convertUuidToObjectId(createdOrder.id),
          productId: convertUuidToObjectId(item.id),
          price: parseFloat(item.price),
          count: item.count,
        },
      });
    }
  }

  console.log('Success!');
  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
