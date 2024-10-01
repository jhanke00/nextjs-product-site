'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LS_TOKEN_KEY } from '@utils/enums';
import { api } from '@utils/api';

const Signin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/signin', form);
      const token = response.data.data.token;
      console.log(token, 'setting token');
      localStorage.setItem(LS_TOKEN_KEY, token);
      router.push('/protected');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-950'>
      <div className='bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-sm'>
        <h2 className='text-2xl font-bold text-white text-center mb-6'>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-300 mb-2'>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='you@example.com'
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-6'>
            <label htmlFor='password' className='block text-gray-300 mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='••••••••'
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
