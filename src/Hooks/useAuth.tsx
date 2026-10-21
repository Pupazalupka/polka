import { useState, useEffect } from 'react';
import { getMe } from '../Api/Auth/Auth';
import type { AuthState } from '../Types';

export function useAuth(): AuthState {
  const [user, setUser] = useState<AuthState['user']>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, isAuthenticated: !!user };
};