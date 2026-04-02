'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthState {
  isLoggedIn: boolean;
  user?: { username: string };
  loading: boolean;
}

export const useAuth = () => {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    loading: true,
  });

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const username = sessionStorage.getItem('username');

    setAuthState({
      isLoggedIn,
      user: isLoggedIn ? { username: username || 'User' } : undefined,
      loading: false,
    });

    if (!isLoggedIn && !window.location.pathname.includes('/login')) {
      router.push('/login');
    }
  }, [router]);

  const login = (username: string, password: string) => {
    // Mock credentials
    if (username === 'admin' && password === 'password123') {
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('username', username);
      setAuthState({
        isLoggedIn: true,
        user: { username },
        loading: false,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    setAuthState({
      isLoggedIn: false,
      loading: false,
    });
  };

  return {
    ...authState,
    login,
    logout,
  };
};
