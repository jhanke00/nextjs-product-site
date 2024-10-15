import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

interface Order {
  user: string;
  items: {
    id: string;
    name: string;
    price: string;
    count: number;
  }[];
  total: number;
  time: string;
}

export default function UsersComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const openModal = async (user: User) => {
    setLoadingOrders(true);
    setShowModal(true);
    setSelectedUser(user);
    try {
      const response = await fetch(`/api/orders?id=${user.id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setOrders([data]);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setOrders([]);
    setSelectedUser(null);
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-backdrop')) {
      closeModal();
    }
  };

  return (
    <>
      <h3 style={{ margin: '20px 0 20px 0' }} className='card-title'>
        Users List
      </h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ maxHeight: '500px', overflowY: 'auto', marginTop: '10px' }}>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>First Name</th>
                <th scope='col'>Last Name</th>
                <th scope='col'>Phone Number</th>
                <th scope='col'>Email</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email}</td>
                  <td style={{ cursor: 'pointer' }} onClick={() => openModal(user)}>
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showModal && (
        <>
          <div
            className='modal fade show'
            style={{ display: 'block' }}
            tabIndex={-1}
            role='dialog'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
            onClick={handleBackdropClick}
          >
            <div className='modal-dialog' role='document'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='exampleModalLabel'>
                    Orders for {selectedUser?.firstName} {selectedUser?.lastName}
                  </h5>
                </div>
                <div className='modal-body'>
                  {loadingOrders ? (
                    <p>Loading orders...</p>
                  ) : (
                    <ul>
                      {orders.map((order) =>
                        order.items.map((item) => (
                          <li key={item.id}>
                            {item.name} (Quantity: {item.count}, Price: {item.price})
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                </div>
                <div className='modal-footer'>
                  <button type='button' className='btn btn-secondary' onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-backdrop fade show' onClick={closeModal} />
        </>
      )}
    </>
  );
}
