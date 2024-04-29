import { Product } from '../type/products';
import '../../app/globals.css';

interface Props {
  product: Product;
}

export default function ProductComponent(props: Props) {
  const prod = props.product;
  return (
    <>
      <h3 className={`mb-3 text-2xl font-semibold`}>{prod.name}</h3>
      {[
        { label: 'Price', value: prod.price },
        { label: 'Description', value: prod.description },
        { label: 'Category', value: prod.category },
        { label: 'Rating', value: prod.rating },
        { label: 'Reviews', value: prod.numReviews },
        { label: 'Stock', value: prod.countInStock },
      ].map((p) => (
        <p key={p.label} className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          {p.label}: {p.value}
        </p>
      ))}
    </>
  );
}
