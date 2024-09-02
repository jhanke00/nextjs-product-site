import { FormEvent, useState } from 'react';
import useAuth from '@/app/contexts/auth/use.auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await login(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername} />
      <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword} />
      <button type='submit'>Login</button>
    </form>
  );
};

export default Login;
