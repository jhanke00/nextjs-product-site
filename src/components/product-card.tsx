import CardRating from '@/src/components/card-rating';
import type { Product } from '@/src/type/products';
import { Card, CardBody, CardFooter, CardHeader, Chip } from '@nextui-org/react';
import { Open_Sans, Roboto_Mono } from 'next/font/google';
import Link from 'next/link';
import { MdRateReview } from 'react-icons/md';

type ProductWithStringPrice = Omit<Product, 'id' | 'price'> & { id: string; price: string };

interface ProductCardProps {
  product: ProductWithStringPrice;
}

const nameFont = Open_Sans({ weight: '700', subsets: ['latin'], style: 'normal' });
const descriptionFont = Roboto_Mono({ weight: '400', subsets: ['latin'], style: 'normal' });

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className=''>
      <Link key={product.id} href={`/products/${product.id}`}>
        <Card isPressable>
          <CardHeader>
            <div className='w-full flex flex-row items-center justify-between'>
              <h3 className={`text-2xl ${nameFont.className}`}>{product.name}</h3>
              <Chip color='warning' variant='flat'>
                {product.category}
              </Chip>
            </div>
          </CardHeader>

          <CardBody className='flex-grow flex flex-col'>
            <div className={`text-md overflow-hidden ${descriptionFont.className} h-24 mb-4`}>
              {product.description.length > 100 ? product.description.slice(0, 100) + '...' : product.description}
            </div>
            <div className='flex flex-row flex-nowrap items-center gap-4 mt-auto'>
              <CardRating rating={product.rating} />
              <div className='flex flex-row flex-nowrap items-center gap-2' title={`${product.numReviews} reviews`}>
                <MdRateReview />
                <span className='text-sm'>{product.numReviews}</span>
              </div>
            </div>
          </CardBody>

          <CardFooter>
            <div className='w-full flex justify-between items-end'>
              {product.countInStock === 0 && <p className='text-sm opacity-50'>Out of Stock</p>}
              {product.countInStock > 0 && (
                <p className='text-sm opacity-50'>
                  <span className='font-bold'>{product.countInStock}</span> units in stock
                </p>
              )}
              <p className='text-lg text-green-200'>${product.price}</p>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}
