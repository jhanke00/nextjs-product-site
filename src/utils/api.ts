'use client';

import axios from 'axios';
import { LS_TOKEN_KEY } from '@utils/enums';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem(LS_TOKEN_KEY);
      window.location.href = '/auth/signin';
    }
    return Promise.reject(error);
  }
);

export { api };
