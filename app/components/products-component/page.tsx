import { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  rating: number;
  numReviews: number;
  countInStock: number;
}

export default function ProductsComponent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderStars = (rating: number) => {
    const roundedRating = Math.round(rating * 10) / 10;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= roundedRating ? '#ffd700' : '#e4e5e9' }}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <>
      <h3 style={{ margin: '20px 0' }} className='card-title'>
        Products List
      </h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ maxHeight: '500px', overflowY: 'auto', marginTop: '10px' }}>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Product Name</th>
                <th scope='col'>Category</th>
                <th scope='col'>Price</th>
                <th scope='col'>Stock</th>
                <th scope='col'>Rating</th>
                <th scope='col'>Reviews</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    {renderStars(product.rating)} ({product.rating.toFixed(1)})
                  </td>
                  <td>{product.numReviews}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
