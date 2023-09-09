import { materialTypeSchema } from '@features/material/lib/enums';
import { z } from 'zod';
import { advancementTypeSchema } from './enums';

export const advancementSchema = z.object({
  Name: z.string(),
  Description: z.string(),
  Type: advancementTypeSchema,
  ValueInitial: z.number(),
  ValueIncrease: z.number(),
  ValueMax: z.number(),
  IsPercentage: z.boolean(),
  CostToUnlock: z.number(),
  CostFirstUpgrade: z.number(),
  CostIncreasePerUpgrade: z.number(),
  Phase: z.number(),
  ResourceType: materialTypeSchema.nullable(),
});
export type Advancement = z.infer<typeof advancementSchema>;

export interface AdvancementState extends Advancement {
  Level: number;
}
