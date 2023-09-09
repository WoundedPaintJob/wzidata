import { materialSchema } from '@features/material/lib/types';
import { z } from 'zod';
import { techTypeSchema } from './enums';

export const techSchema = z.object({
  Id: z.number(),
  Parent: z.number(),
  Row: z.number(),
  Column: z.number(),
  Name: z.string(),
  Materials: z.array(materialSchema),
  Type: techTypeSchema,
  Effect: z.number(),
  Image: z.string(),
});
export type Tech = z.infer<typeof techSchema>;

export interface TechState extends Tech {
  Bought: boolean;
}
