'use client';

import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { login } from '../config/aws-utils'; // Função de login para autenticar no Cognito

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState(''); // Mudando de email para username
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(''); // Adicionando estado para exibir erros

  useEffect(() => {
    const savedUsername = localStorage.getItem('rememberedUsername');
    const savedPassword = localStorage.getItem('rememberedPassword');

    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login(username, password);

      if (result.success) {
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 60);
        document.cookie = `token=${result.token}; path=/; expires=${expires.toUTCString()}`;
        router.push('/dashboard');

        if (rememberMe) {
          localStorage.setItem('rememberedUsername', username);
          localStorage.setItem('rememberedPassword', password);
        } else {
          localStorage.removeItem('rememberedUsername');
          localStorage.removeItem('rememberedPassword');
        }

        router.push('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Erro no login:', err);
      setError('Falha no login. Por favor, tente novamente.');
    }
  };

  const navigateToRegister = () => {
    router.push('/register');
  };

  return (
    <div className={`d-flex justify-content-center align-items-center vh-100`}>
      <div className='card p-4' style={{ width: '350px' }}>
        <div className='card-body'>
          <h5 className='card-title text-center mb-4'>Please sign in</h5>
          <form onSubmit={handleLogin}>
            <div className='form-group mb-3'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                className='form-control'
                id='username'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              />
            </div>
            <div className='form-group form-check mb-3'>
              <input
                type='checkbox'
                className='form-check-input'
                id='rememberMe'
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className='form-check-label' htmlFor='rememberMe'>
                Remember me
              </label>
            </div>
            {error && <p className='text-danger'>{error}</p>}
            <button type='submit' className='btn btn-primary w-100'>
              Sign in
            </button>
          </form>
          <div className='mt-3 text-center'>
            <button
              className='btn btn-link'
              onClick={navigateToRegister}
              style={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              Don’t have an account? Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
