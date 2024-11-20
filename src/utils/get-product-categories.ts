import largeProductsList from '../mock/large/products.json';
import smallProductsList from '../mock/small/products.json';

export const getProductCategories = () => {
  const productsList = [...largeProductsList, ...smallProductsList];
  const categories = new Set<string>();
  for (const product of productsList) {
    if (!categories.has(product.category)) categories.add(product.category);
  }
  return [...categories].sort();
};
