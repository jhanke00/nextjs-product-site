'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { verification, resendVerificationCode } from '../config/aws-utils';

export default function Verify() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleVerification = async (e: any) => {
    e.preventDefault();
    const result = await verification(username, verificationCode);

    if (result.success) {
      setMessage('Verification successful! Redirecting...');
      setError('');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      setError(result.error);
      setMessage('');
    }
  };

  const handleResendCode = async () => {
    const result = await resendVerificationCode(username);
    if (result.success) {
      setMessage('Verification code resent! Please check your email.');
      setError('');
    } else {
      setError(result.error);
      setMessage('');
    }
  };

  const navigateToLogin = () => {
    router.push('/login');
  };

  return (
    <div className={`d-flex justify-content-center align-items-center vh-100`}>
      <div className='card p-4' style={{ width: '350px' }}>
        <div className='card-body'>
          <h5 className='card-title text-center mb-4'>Verify your account</h5>
          {error && <div className='alert alert-danger'>{error}</div>}
          {message && <div className='alert alert-success'>{message}</div>}
          <div className='mb-3'>
            <strong>Username:</strong> <span>{username}</span>
          </div>
          <form onSubmit={handleVerification}>
            <div className='form-group mb-3'>
              <label htmlFor='verificationCode'>Verification Code</label>
              <input
                type='text'
                className='form-control'
                id='verificationCode'
                placeholder='Verification Code'
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
            </div>
            <button type='submit' className='btn btn-primary w-100'>
              Confirm
            </button>
            <button type='button' className='btn btn-link w-100 mt-2' onClick={handleResendCode}>
              Resend Verification Code
            </button>
          </form>
          <div className='mt-3 text-center'>
            <button
              className='btn btn-link'
              onClick={navigateToLogin}
              style={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
