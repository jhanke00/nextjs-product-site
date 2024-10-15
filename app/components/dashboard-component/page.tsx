import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBoxOpen, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

export default function DashboardComponent() {
  const [productsCount, setProductsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProductsCount(data.length);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsersCount(data.length);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrdersCount(data.length);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchUsers(), fetchOrders()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <h3 style={{ margin: '20px 0 20px 0' }} className='card-title'>
        Dashboard
      </h3>
      <div className='d-flex flex-row'>
        <div className='p-2'>
          <div className='card' style={{ width: '200px' }}>
            <div className='card-body d-flex justify-content-between align-items-center'>
              <div>
                <h5 className='card-title'>{loading ? 'Loading...' : usersCount}</h5>
                <p className='card-text'>Users</p>
              </div>
              <FontAwesomeIcon icon={faUsers} style={{ fontSize: '24px' }} />
            </div>
          </div>
        </div>
        <div className='p-2'>
          <div className='card' style={{ width: '200px' }}>
            <div className='card-body d-flex justify-content-between align-items-center'>
              <div>
                <h5 className='card-title'>{loading ? 'Loading...' : productsCount}</h5>
                <p className='card-text'>Products</p>
              </div>
              <FontAwesomeIcon icon={faBoxOpen} style={{ fontSize: '24px' }} />
            </div>
          </div>
        </div>
        <div className='p-2'>
          <div className='card' style={{ width: '200px' }}>
            <div className='card-body d-flex justify-content-between align-items-center'>
              <div>
                <h5 className='card-title'>{loading ? 'Loading...' : ordersCount}</h5>
                <p className='card-text'>Orders</p>
              </div>
              <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '24px' }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
