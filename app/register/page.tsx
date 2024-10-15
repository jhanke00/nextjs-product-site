'use client';

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { signUp } from '../config/aws-utils';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await signUp(username, password, email);

    if (response.success) {
      localStorage.setItem('username', username);
      setSuccessMessage('Sign-up successful! Redirecting...');
      setErrorMessage('');
      setTimeout(() => {
        router.push('/verify');
      }, 1500);
    } else {
      setErrorMessage(response.error);
      setSuccessMessage('');
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='card' style={{ width: '350px' }}>
        <div className='card-body'>
          <h5 className='card-title text-center mb-4'>Create an account</h5>
          {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
          {successMessage && <div className='alert alert-success'>{successMessage}</div>}
          <form onSubmit={handleRegister}>
            <div className='form-group mb-3'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                className='form-control'
                id='username'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className='form-group mb-3'>
              <label htmlFor='email'>Email address</label>
              <input
                type='email'
                className='form-control'
                id='email'
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='form-group mb-3'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                className='form-control'
                id='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type='submit' className='btn btn-primary w-100'>
              Sign up
            </button>
          </form>
          <div className='text-center mt-3'>
            <p>
              Already have an account?{' '}
              <a href='#' onClick={() => router.push('/login')}>
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
