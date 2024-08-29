import useSWR from 'swr';
import { Product } from '@type/products';
import { fetcher } from '@utils/fetcher';
import { CustomResponse } from '@type/custom.response';

type ProductQueryData = {
  productId: string;
};

/**
 * Retrieves the details of a product using the provided productId.
 *
 * @param {ProductQueryData} productId - The productId to fetch the product details for.
 *
 * @returns {Object} - An object containing the product details, loading status, and error.
 * @property {Product} data - The details of the product retrieved.
 * @property {boolean} isLoading - Indicates if the product details are currently being loaded.
 * @property {Error} error - The error that occurred while fetching the product details, if any.
 */
export const getProductDetail = ({ productId }: ProductQueryData): CustomResponse<Product> => {
  const { data, isLoading, error } = useSWR<{ data: Product }>(`/products/${productId}`, fetcher);

  return {
    data: data?.data,
    isLoading,
    error,
  };
};
