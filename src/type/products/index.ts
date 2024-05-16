export type Product = {
  productId: number;
  name: string;
  price: string;
  description: string;
  category: string;
  rating: number;
  numReviews: number;
  countInStock: number;
};

export type ProductResponse = {
  data: Product[];
  pageData: {
    page: number;
    size: number;
    totalPages: number;
  };
};
