import largeData from '@/src/mock/large/products.json';
import smallData from '@/src/mock/small/products.json';
import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'bson';

const prisma = new PrismaClient();

function uuidToObjectId(uuid: string) {
  // uuid to 12-byte buffer
  const buffer = Buffer.from(uuid.replace(/-/g, ''), 'hex');

  // make sure buffer is 12-byte
  const paddedBuffer = Buffer.alloc(12);
  buffer.copy(paddedBuffer, 12 - Math.min(buffer.length, 12));

  // return ObjectId
  return new ObjectId(paddedBuffer).toHexString();
}

async function seed() {
  await prisma.product.deleteMany({});
  console.info('Product collection cleared!');

  const allProducts = [...largeData, ...smallData].map((product) => ({
    ...product,
    // converting id because of ObjectId
    id: uuidToObjectId(product.id),
    // converting price to cents because of precision
    price: Number(product.price) * 100,
  }));

  await prisma.product.createMany({
    data: allProducts,
  });
  console.info('Products seeded!');
}

seed();
