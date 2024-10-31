import { type RouteObject } from 'react-router-dom';

import { PublicOnlyRoute } from '../../ui';
import { AuthPage } from '@/pages/auth';
import { AuthRegistrationPage } from '@/pages/auth-registration';

export const auth: RouteObject = {
  path: '/auth',
  children: [
    {
      path: '',
      element: (
        <PublicOnlyRoute>
          <AuthPage />
        </PublicOnlyRoute>
      ),
    },
    {
      path: 'register',
      element: (
        <PublicOnlyRoute>
          <AuthRegistrationPage />
        </PublicOnlyRoute>
      ),
    },
  ],
};
