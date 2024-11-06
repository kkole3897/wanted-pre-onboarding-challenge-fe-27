import { z } from 'zod';

import { QUERY_KEYS } from '../constants';
import { SortKeyEnum } from './sort-key';
import { OrderKeyEnum } from './order-key';

export const QuerySchema = z
  .object({
    [QUERY_KEYS.Sort]: SortKeyEnum.optional().catch(SortKeyEnum.enum.CreatedAt),
    [QUERY_KEYS.Order]: OrderKeyEnum.optional().catch(OrderKeyEnum.enum.Desc),
  })
  .transform((data) => {
    let { sort_by: sortBy = SortKeyEnum.enum.CreatedAt, order } = data;

    if (sortBy === SortKeyEnum.enum.Title) {
      order = order ?? OrderKeyEnum.enum.Asc;
    } else {
      order = order ?? OrderKeyEnum.enum.Desc;
    }

    return {
      sortBy,
      order,
    };
  });

export type Query = z.infer<typeof QuerySchema>;
