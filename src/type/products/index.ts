export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  numReviews: number;
  countInStock: number;
};

export type ProductOrder = {
  id: string;
  total: number;
  time: Date;
  userId?: string;
  products: {
    id: string;
    count: number;
    productId: string;
    orderId: string;
    product: Product;
  }[];
};
