import { Navigate } from 'react-router-dom';

import { useVisitorStore } from '@/entities/visitor';

type PublicOnlyRouteProps = {
  children: React.ReactNode;
};

export default function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const isAuthenticated = useVisitorStore(
    (state) => state.accessToken !== undefined
  );

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
}
