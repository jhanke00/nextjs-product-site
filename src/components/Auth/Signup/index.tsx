import { FormEvent, useState } from 'react';
import useAuth from '@/app/contexts/auth/use.auth';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { signup } = useAuth();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await signup(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername} />
      <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword} />
      <button type='submit'>Signup</button>
    </form>
  );
};

export default Signup;
