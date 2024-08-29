import useSWR from 'swr';
import { Product } from '@type/products';
import { fetcher } from '@utils/fetcher';
import { CustomResponse } from '@type/custom.response';

type ProductQueryData = {
  productId: string;
};

/**
 * Retrieves a similar product based on the provided product ID.
 *
 * @param {ProductQueryData} parameters - The parameters for the request.
 * @param {string} parameters.productId - The ID of the product.
 *
 * @returns {CustomResponse<Product[]>} The response object containing the similar product data.
 * @property {Product[]} data - The data of the similar product.
 * @property {boolean} isLoading - Indicates if the request is in progress.
 * @property {Error} error - The error that occurred during the request, if any.
 */
export const getSimilarProduct = ({ productId }: ProductQueryData): CustomResponse<Product[]> => {
  const { data, isLoading, error } = useSWR<{ data: Product[] }>(`/products/similar/${productId}`, fetcher);

  return {
    data: data?.data,
    isLoading,
    error,
  };
};
