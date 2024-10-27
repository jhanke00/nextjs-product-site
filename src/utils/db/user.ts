import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findUser = (email: string) =>
  prisma.user.findFirst({
    where: {
      email,
    },
  });

export const getUser = (id: string) =>
  prisma.user.findFirst({
    where: {
      id,
    },
  });

export const createUser = (email: string, password: string, firstName: string, lastName: string, phoneNumber: string) =>
  prisma.user.create({
    data: {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    },
    select: {
      id: true,
    },
  });
