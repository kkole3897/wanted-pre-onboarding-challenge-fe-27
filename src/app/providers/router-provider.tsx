import { RouterProvider as ReactRouterProvider } from 'react-router';

import { router } from '../router';

export default function RouterProvider() {
  return <ReactRouterProvider router={router} />;
}
