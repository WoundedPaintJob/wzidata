import { z } from 'zod';
import { materialSchema } from '@features/material/lib/types';
export const rewardCacheSchema = z.object({
  Armies: z.number(),
  Money: z.number(),
  Materials: z.array(materialSchema),
});
export type RewardCache = z.infer<typeof rewardCacheSchema>;
