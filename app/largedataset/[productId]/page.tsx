import largeData from '@/src/mock/large/products.json';

const productDetail = ({ params }: { params: { productId: string } }) => {
  const data = [...largeData];
  const product = data.find((item) => item.id === params.productId);
  if (!product) {
    return <p>Product not Found</p>;
  }

  return (
    <div className='flex min-h-screen flex-col p-24 border-gray-300'>
      <div className='left-0 top-0 w-full border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30'>
        Product Details - Need an endpoint that queries for a single product and returns the information for that
        product
      </div>
      <h3 className={`mb-3 font-semibold`}>{product.name}</h3>
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>
      <p>Category: {product.category}</p>
      <p>Rating: {product.rating}</p>
      <p>Reviews: {product.numReviews}</p>
      <p>Stock: {product.countInStock}</p>
    </div>
  );
};

export default productDetail;
