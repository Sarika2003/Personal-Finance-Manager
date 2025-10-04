import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const ProtectedRoute = () => {
  const { isAuthenticated, loading, initAuth } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      initAuth();
    }
  }, [isAuthenticated, loading, initAuth]);

  if (loading) {

    return <div className="text-center mt-5">Loading authentication...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;