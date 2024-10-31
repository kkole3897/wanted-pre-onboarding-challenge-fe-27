import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from '@/pages/home';
import { auth } from './auth';
import { ProtectedRoute } from '../ui';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  auth,
]);
