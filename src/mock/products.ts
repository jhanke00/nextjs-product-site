import { Product } from '../type/products';

const smallData: Product[] = require('./small/products.json');
const largeData: Product[] = require('./large/products.json');

export const getProducts = (): Product[] => [...smallData, ...largeData];

export const getProductById = (id: string): Product | undefined => getProducts().find((item) => item.id === id);
