import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, loading, isAdmin, userRole } = useAuth();

  // Wait until the user role is fetched after sign-in
  const roleLoading = user && userRole === null;

  console.log('ProtectedRoute check:', {
    user: user?.email,
    loading,
    roleLoading,
    isAdmin,
    requireAdmin,
  });

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('No user found, redirecting to auth');
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && !isAdmin) {
    console.log('Admin required but user is not admin:', { isAdmin });
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">
            You don't have permission to access this area.
          </p>
          <Navigate to="/" replace />
        </div>
      </div>
    );
  }

  console.log('Access granted');
  return <>{children}</>;
};

export default ProtectedRoute;
