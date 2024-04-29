import ProductComponent from '@/src/components/product';
import { Product } from '@/src/type/products';
import Link from 'next/link';

const ProductsDisplay = (props: any) => {
  const { dataDisplayed } = props;
  return (
    <main className='flex min-h-screen flex-col items-center p-8'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <div className='grid lg:max-w-5xl lg:w-full lg:grid-cols-2 lg:text-left'>
          {dataDisplayed.map((product: Product) => (
            <div
              key={product._id}
              className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
            >
              <Link href={`/products/${product._id}`}>
                <ProductComponent product={product} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProductsDisplay;
