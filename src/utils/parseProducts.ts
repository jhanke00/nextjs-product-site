import { Product } from '../type/products';
import largeData from '@/src/mock/large/products.json';
import smallData from '@/src/mock/small/products.json';

type DataTypeLargeData = typeof largeData;
type DataTypeSmallData = typeof smallData;

export const parseProducts = (productList: DataTypeLargeData | DataTypeSmallData): Product[] => {
  return productList.map((product) => ({ ...product, price: Number(product.price) }));
};
