import { createContext } from 'react';
import { AuthContextProps } from '@/app/contexts/auth/auth.context.props';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default AuthContext;
