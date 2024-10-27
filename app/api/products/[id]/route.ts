import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'bson';

import { findProduct } from '@/src/utils/db/products';
import { handleError, errorHandler } from '@/src/utils/helpers';
import { HttpRequestStatus } from '@/src/type/http';

type Context = {
  params: {
    id: string;
  };
};

export async function GET(_request: NextRequest, context: Context) {
  return processRequest(context.params.id).catch(errorHandler);
}

const processRequest = async (id: string) => {
  if (!ObjectId.isValid(id)) return handleError('Invalid productId!');

  const product = await findProduct(id);
  if (!product) return handleError('Product not found!', HttpRequestStatus.NOT_FOUND);

  const { categoryId: _categoryId, category, ...productInfo } = product;

  return NextResponse.json({ product: { ...productInfo, category: category?.name } });
};
