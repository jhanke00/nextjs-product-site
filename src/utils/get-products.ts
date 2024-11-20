import largeProductsList from '../mock/large/products.json';
import smallProductsList from '../mock/small/products.json';

export type GetProductsProps = {
  category?: string;
  name?: string;
};

export const getProducts = (props: GetProductsProps) => {
  let productsList = [...largeProductsList, ...smallProductsList];

  if (Object.keys(props || {})?.length === 0) return productsList;

  if (props?.category) productsList = productsList.filter(({ category }) => category === props?.category);

  if (props?.name)
    productsList = productsList.filter(({ name }) => {
      const regExp = new RegExp(props?.name || '', 'i');
      return regExp.test(name);
    });

  return productsList;
};
