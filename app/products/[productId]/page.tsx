import ProductCard from '@/src/components/ui/ProductList/ProductCard';
import largeData from '@/src/mock/large/products.json';
import smallData from '@/src/mock/small/products.json';

const productDetail = ({ params }: { params: { productId: string } }) => {
  const data = [...largeData, ...smallData];
  const product = data.find((item) => item.id === params.productId);
  if (!product) {
    return <p>Product not Found</p>;
  }

  return <ProductCard product={product} />;
};

export default productDetail;
