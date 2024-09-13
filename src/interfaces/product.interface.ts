import { PaginationResponse } from '@/src/interfaces';

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  rating: number;
  numReviews: number;
  countInStock: number;
}

export interface ProductListResponse {
  pagination: PaginationResponse;
  products: Product[];
}
