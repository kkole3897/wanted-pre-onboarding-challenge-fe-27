import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Providers } from './providers';
import { setAxiosInterceptor } from './lib';
import { coreClient } from '@/shared/api';

setAxiosInterceptor(coreClient);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers />
  </StrictMode>
);
