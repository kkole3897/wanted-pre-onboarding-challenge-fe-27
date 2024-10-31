import QueryClientProvider from './query-client-provider';
import RouterProvider from './router-provider';

export default function Providers() {
  return (
    <QueryClientProvider>
      <RouterProvider />
    </QueryClientProvider>
  );
}
