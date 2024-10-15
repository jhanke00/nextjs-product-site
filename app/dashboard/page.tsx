'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardComponent from '../components/dashboard-component/page';
import UsersComponent from '../components/users-component/page';
import ProductsComponent from '../components/products-component/page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
  const router = useRouter();
  const [content, setContent] = useState('Home');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const checkToken = () => {
      const cookieToken = document.cookie.split('; ').find((row) => row.startsWith('token='));
      if (!cookieToken) {
        router.push('/login');
        return;
      }
      const token = cookieToken.split('=')[1];
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUsername(payload.username);
    };

    checkToken();
  }, [router]);

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/login');
  };

  const renderContent = () => {
    switch (content) {
      case 'Dashboard':
        return <DashboardComponent />;
      case 'Users':
        return <UsersComponent />;
      case 'Products':
        return <ProductsComponent />;
      default:
        return <DashboardComponent />;
    }
  };

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
        <div className='container'>
          <a className='navbar-brand'>Bayer</a>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarTogglerDemo02'
            aria-controls='navbarTogglerDemo02'
            aria-expanded='false'
            aria-label='Alterna navegação'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='navbarTogglerDemo02'>
            <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
              <li className='nav-item active'>
                <button
                  className={`nav-link btn ${content === 'Dashboard' ? 'active' : ''}`}
                  onClick={() => setContent('Dashboard')}
                >
                  Dashboard
                </button>
              </li>
              <li className='nav-item'>
                <button
                  className={`nav-link btn ${content === 'Users' ? 'active' : ''}`}
                  onClick={() => setContent('Users')}
                >
                  Users
                </button>
              </li>
              <li className='nav-item'>
                <button
                  className={`nav-link btn ${content === 'Products' ? 'active' : ''}`}
                  onClick={() => setContent('Products')}
                >
                  Products
                </button>
              </li>
            </ul>
            <div className='d-flex align-items-center ms-auto'>
              <span className='navbar-text text-white me-3'>
                Hello, <b>{username}</b>
              </span>
              <button className='btn btn-outline-light' onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOut} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className='container mt-4'>{renderContent()}</div>
    </>
  );
}
