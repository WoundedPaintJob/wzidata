import { instructionTypeSchema } from '../enums';
import { z } from 'zod';

export const instructionSchema = z.object({
  Id: z.number(),
  Description: z.string(),
  Type: instructionTypeSchema
})
export type Instruction = z.infer<typeof instructionSchema>;
export interface InstructionState extends Instruction {
  Done: boolean;
}
export const instructionStateSchema = instructionSchema.extend({
  ZoneIds: z.array(z.number()).optional(),
  ZoneId: z.number().nullable().optional(),
  BonusId: z.number().nullable().optional(),
  Done: z.boolean()
})
export const instructionArraySchema = z.array(instructionStateSchema);