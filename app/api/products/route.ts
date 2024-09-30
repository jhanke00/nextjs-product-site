import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface ProductProps {
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  numReviews: number;
  countInStock: number;
}

export async function GET() {
  try {
    const products = await prisma.product.findMany();

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, price, description, category, rating, numReviews, countInStock }: ProductProps = await request.json();

    const productExists = await prisma.product.findFirst({
      where: {
        name,
      },
    });

    if (productExists?.name.toLowerCase() === name.toLowerCase()) {
      return NextResponse.json({ error: 'Product already exists' }, { status: 400 });
    }

    await prisma.product.create({
      data: {
        name: name,
        price: price,
        description: description,
        category: category,
        rating: rating,
        numReviews: numReviews,
        countInStock: countInStock,
      },
    });
    return NextResponse.json('Product created successfully', { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
