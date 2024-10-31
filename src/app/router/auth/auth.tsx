import { type RouteObject } from 'react-router-dom';

import { AuthPage } from '@/pages/auth';
import { AuthRegistrationPage } from '@/pages/auth-registration';

export const auth: RouteObject = {
  path: '/auth',
  children: [
    {
      path: '',
      element: <AuthPage />,
    },
    {
      path: 'register',
      element: <AuthRegistrationPage />,
    },
  ],
};
