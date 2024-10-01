'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@utils/api';
import { User } from '@/src/type/users';

const INITIAL_FORM: Omit<User, 'id'> = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  password: '',
};

const Signup = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', form);
      router.push('/auth/signin');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-950'>
      <div className='bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-sm'>
        <h2 className='text-2xl font-bold text-white text-center mb-6'>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='firstName' className='block text-gray-300 mb-2'>
              First Name
            </label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              className='w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='First Name'
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='lastName' className='block text-gray-300 mb-2'>
              Last Name
            </label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              className='w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Last Name'
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='phoneNumber' className='block text-gray-300 mb-2'>
              Phone Number
            </label>
            <input
              type='tel'
              id='phoneNumber'
              name='phoneNumber'
              className='w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Phone Number'
              value={form.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
