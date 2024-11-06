import z from 'zod';

import { ORDER_KEYS } from '../constants';

export const OrderKeyEnum = z.nativeEnum(ORDER_KEYS);

export type OrderKey = z.infer<typeof OrderKeyEnum>;
