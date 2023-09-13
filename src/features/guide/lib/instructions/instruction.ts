import { instructionTypeSchema } from '../enums';
import { z } from 'zod';

export const instructionSchema = z.object({
  id: z.number(),
  description: z.string(),
  type: instructionTypeSchema
})
export type Instruction = z.infer<typeof instructionSchema>;
export interface InstructionState extends Instruction {
  done: boolean;
}