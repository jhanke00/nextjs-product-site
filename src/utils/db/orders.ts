import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getOrdersFromUser = (userId: string) =>
  prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      orders: {
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });
