import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProducts = (query: Prisma.ProductFindManyArgs) => prisma.product.findMany(query);

export const findProduct = (id: string) =>
  prisma.product.findFirst({
    where: {
      id,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
