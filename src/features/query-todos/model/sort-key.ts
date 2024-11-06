import z from 'zod';

import { SORT_KEYS } from '../constants';

export const SortKeyEnum = z.nativeEnum(SORT_KEYS);

export type SortKey = z.infer<typeof SortKeyEnum>;
