import { Filter, FindOptions } from 'mongodb';
import { Product } from '../type/products/index';
import { collections } from '../config/db';

export const getProducts = async (limit: number = 12, skip: number = 0): Promise<Product[] | undefined> => {
  if (limit > 100) limit = 100;

  const filter = {} as Filter<Product>;
  const project = { _id: 0 } as FindOptions<Product>;

  const productCursor = collections?.products?.find(filter, project);
  const books = await productCursor?.limit(limit).skip(skip).toArray();

  return books || undefined;
};
