import axios from 'axios';

import { api } from '@/shared/config';

export const client = axios.create({
  baseURL: api.core,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30 * 1000,
});
