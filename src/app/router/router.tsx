import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from '@/pages/home';
import { AuthPage } from '@/pages/auth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
]);
