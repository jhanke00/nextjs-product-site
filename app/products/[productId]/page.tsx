import { getProductById } from '@/src/mock/products';
import ProductComponent from '@/src/components/product';
import { Product } from '@/src/type/products';

const productDetail = ({ params }: { params: { productId: string } }) => {
  const product: Product | undefined = getProductById(params.productId);
  if (!product) {
    return <p>Product not Found</p>;
  }

  return (
    <div className='flex min-h-screen flex-col p-24'>
      <h1 className='text-2xl font-semibold'>Product Description</h1>
      <ProductComponent product={product} />
    </div>
  );
};

export default productDetail;
