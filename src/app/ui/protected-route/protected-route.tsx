import { Navigate } from 'react-router';

import { useVisitorStore } from '@/entities/visitor';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useVisitorStore(
    (state) => state.accessToken !== undefined
  );

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return children;
}
