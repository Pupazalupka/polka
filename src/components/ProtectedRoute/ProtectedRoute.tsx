import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../Hooks/useAuth";

export const ProtectedRoute = (children : PropsWithChildren) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return 'loading';

  if (!isAuthenticated) {
    return <Navigate to='/login' replace/>
  }

  return (
    <>
      {children}
    </>
  )
};