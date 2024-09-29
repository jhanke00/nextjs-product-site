import { Product } from '@/src/type/products';
import ProductCard from './ProductCard';

interface ProductsListProps {
  products: Product[];
}

export default function ProductsList({ products }: ProductsListProps) {
  return (
    <div className='z-10 max-w-5xl w-full font-mono text-sm'>
      {products.length > 0 ? (
        <div className='grid lg:max-w-5xl lg:w-full lg:grid-cols-2 lg:text-left'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className='text-lg text-gray-500'>No products found based on the selected filters.</p>
      )}
    </div>
  );
}
