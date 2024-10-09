import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUserById(id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    console.error('Error retrieving user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
