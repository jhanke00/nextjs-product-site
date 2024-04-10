import largeData from '@/src/mock/large/products.json';
import smallData from '@/src/mock/small/products.json';

const productDetail = ({ params }: { params: { productId: string } }) => {
  const data = [...largeData, ...smallData];
  const product = data.find((item) => item.id === params.productId);
  if (!product) {
    return <p>Product not Found</p>;
  }

  return (
    <div className='flex min-h-screen flex-col p-24'>
      <table>
        <tbody>
          <tr>
            <th>&nbsp;</th>
            <th>
              <h3 className={`mb-3 text-xl `}>{product.name}</h3>
            </th>
          </tr>
          <tr>
            <th>Price - </th> <td>{product.price}</td>
          </tr>
          <tr>
            <th>Description - </th> <td>{product.description}</td>
          </tr>
          <tr>
            <th>Category - </th>
            <td> {product.category}</td>
          </tr>
          <tr>
            <th>Rating - </th> <td>{product.rating}</td>
          </tr>
          <tr>
            <th>Reviews - </th> <td>{product.numReviews}</td>
          </tr>
          <tr>
            <th>Stock - </th>
            <td> {product.countInStock}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default productDetail;
