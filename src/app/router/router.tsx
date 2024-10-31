import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from '@/pages/home';
import { auth } from './auth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  auth,
]);
