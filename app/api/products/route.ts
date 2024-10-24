import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import * as yup from 'yup';

import { getProducts } from '@/src/utils/db/products';
import { errorHandler } from '@/src/utils/helpers';

const BILLION = 1_000_000_000;

export async function GET(request: NextRequest) {
  return processRequest(request).catch(errorHandler);
}

const processRequest = async (request: NextRequest) => {
  const searchParams = await getSearchParams(request);

  const { sort, order, search, minPrice, maxPrice, page, limit } = searchParams;

  const where = buildWhere(minPrice, maxPrice, search);

  const orderBy: Prisma.ProductOrderByWithRelationInput = {
    [sort]: order,
  };

  const products = await getProducts({
    where,
    orderBy,
    skip: (page - 1) * limit,
    take: limit,
    include: {
      category: true,
    },
  });

  return NextResponse.json({ products: assembleResponse(products) });
};

const assembleResponse = (productList: any[]) =>
  productList.map(({ categoryId: _categoryId, category, ...product }) => ({
    ...product,
    category: category.name,
  }));

const buildWhere = (minPrice: number, maxPrice: number, search?: string): Prisma.ProductWhereInput => ({
  AND: [
    {
      price: {
        gte: minPrice,
      },
    },
    {
      price: {
        lte: maxPrice,
      },
    },
    {
      OR: [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
    },
  ],
});

const getSearchParams = (request: NextRequest) => {
  const params = {
    sort: request.nextUrl.searchParams.get('sort'),
    order: request.nextUrl.searchParams.get('order'),
    search: request.nextUrl.searchParams.get('search'),
    minPrice: request.nextUrl.searchParams.get('minPrice'),
    maxPrice: request.nextUrl.searchParams.get('maxPrice'),
    page: request.nextUrl.searchParams.get('page'),
    limit: request.nextUrl.searchParams.get('limit'),
  };

  return paramsSchema.validate(params);
};

const paramsSchema = yup
  .object()
  .shape({
    sort: yup
      .string()
      .oneOf(['name', 'price', 'rating', 'countInStock', 'numReviews'])
      .transform((value) => value ?? 'name')
      .required(),
    order: yup
      .string()
      .oneOf(['asc', 'desc'])
      .transform((value) => value ?? 'asc')
      .required(),
    search: yup.string().transform((value) => value ?? ''),
    minPrice: yup
      .number()
      .min(0)
      .transform((value) => value ?? 0)
      .required(),
    maxPrice: yup
      .number()
      .max(BILLION)
      .transform((value) => value ?? BILLION)
      .required(),
    page: yup
      .number()
      .min(1)
      .transform((value) => value ?? 1)
      .required(),
    limit: yup
      .number()
      .min(1)
      .max(100)
      .nullable()
      .transform((value) => value ?? 20)
      .required(),
  })
  .required()
  .noUnknown(true);
