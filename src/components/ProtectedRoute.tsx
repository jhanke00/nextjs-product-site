'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LS_TOKEN_KEY } from '../utils/enums';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [canAccess, setCanAccess] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem(LS_TOKEN_KEY);
      if (!token) {
        console.info('unauthorized, redirecting to signin');
        router.push('/auth/signin');
      }

      setCanAccess(true);
    };

    checkAuth();
  }, [router]);

  if (!canAccess) return null;
  return <>{children}</>;
};

export default ProtectedRoute;
