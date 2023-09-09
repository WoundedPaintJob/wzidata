import { materialSchema } from '@features/material/lib/types';
import { z } from 'zod';

export const recipeSchema = z.object({
  IsSmelted: z.boolean(),
  Produces: materialSchema,
  Requires: z.array(materialSchema),
  Zone: z.number().nullable(),
  Bonus: z.number().nullable(),
  Time: z.number(),
});
export type Recipe = z.infer<typeof recipeSchema>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RecipeState extends Recipe {}
