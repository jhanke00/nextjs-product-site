import useSWR from 'swr';
import { Product } from '@type/products';
import { fetcher } from '@utils/fetcher';
import { Pagination } from '@type/pagination';
import { getUrlSearchParams } from '@utils/get.url.search.params';
import { CustomResponse } from '@type/custom.response';

type ProductQueryData = {
  category: string;
  rating: number;
  price: [number, number];
  search: string;
  page: number;
};

/**
 * Retrieves a list of products based on the provided query data.
 *
 * @param {ProductQueryData} productQueryData - The query data to filter the products.
 * @returns {CustomResponse<Product[]>} - An object containing the list of products, pagination information, loading state, and error state.
 *
 * @example
 * const queryData = {
 *   category: 'electronics',
 *   price: '100-500',
 * };
 *
 * const result = getProducts(queryData);
 * // result = {
 * //   products: [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }],
 * //   pagination: { pageCount: 2, totalCount: 50, page: 1 },
 * //   isLoading: false,
 * //   error: null
 * // }
 */
export const getProducts = (productQueryData: ProductQueryData): CustomResponse<Product[]> => {
  const params = getUrlSearchParams(productQueryData);

  const url = `/products?${params.toString()}`;
  const { data, isLoading, error } = useSWR<{ data: Product[]; pagination: Pagination }>(url, fetcher);

  return {
    data: data?.data || [],
    pagination: data?.pagination || { pageCount: 0, totalCount: 0, page: 1 },
    isLoading,
    error,
  };
};
