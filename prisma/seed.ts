import { PrismaClient } from '@prisma/client';

import { Product } from '@/src/type/products';
import { User } from '@/src/type/users';
import { Order } from '@/src/type/orders';

import SmallOrders from '../src/mock/small/orders.json';
import LargeOrders from '../src/mock/large/orders.json';

import SmallUsers from '../src/mock/small/users.json';
import LargeUsers from '../src/mock/large/users.json';

import SmallProducts from '../src/mock/small/products.json';
import LargeProducts from '../src/mock/large/products.json';

import bcrypt from 'bcrypt';

const generateHashedPassword = (password: string) => bcrypt.hashSync(password, 10);

const main = () => {
  const prisma = new PrismaClient();

  return processSeed(prisma).catch((e) => {
    console.log(`Error seeding DB: `, e);
    prisma.$disconnect();
  });
};

const processSeed = async (prisma: PrismaClient) => {
  await createProducts(prisma, SmallProducts);
  await createProducts(prisma, LargeProducts);

  await createUsers(prisma, SmallUsers);
  await createUsers(prisma, LargeUsers);

  await createOrders(prisma, SmallOrders);
  await createOrders(prisma, LargeOrders);

  prisma.$disconnect();
};

const createProducts = (prisma: PrismaClient, products: Product[]) => {
  return Promise.all(
    products.map(({ category, ...product }) =>
      prisma.product.create({
        data: {
          ...product,
          category: {
            connectOrCreate: {
              where: {
                name: category,
              },
              create: {
                name: category,
              },
            },
          },
        },
      })
    )
  );
};

const createUsers = async (prisma: PrismaClient, users: User[]) => {
  return Promise.all(
    users.map((user) =>
      prisma.user.create({
        data: {
          ...user,
          password: generateHashedPassword(`${user.firstName}+${user.email}`),
        },
      })
    )
  );
};

const createOrders = async (prisma: PrismaClient, orders: Order[]) => {
  const chunks = splitIntoChunks(orders);
  for (const chunk of chunks) {
    await Promise.all(
      chunk.map((order: any) =>
        prisma.order.create({
          data: {
            total: order.total,
            time: order.time,
            user: {
              connect: {
                id: order.user,
              },
            },
            products: {
              create: order.items.map((product: any) => ({
                product: {
                  connect: {
                    id: product.id,
                  },
                },
                count: product.count,
              })),
            },
          },
        })
      )
    );
  }
};

const splitIntoChunks = (array: any, chunkSize = 5000): any => {
  if (array.length === 0) return [];
  const otherChunks = splitIntoChunks(array.slice(chunkSize));
  return [array.slice(0, chunkSize), ...otherChunks];
};

main();
