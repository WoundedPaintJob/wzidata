import { InstructionState, instructionSchema } from "./instruction";
import { z } from 'zod'
export const textInstructionSchema = instructionSchema.extend({
  ZoneId: z.number().nullable(),
  BonusId: z.number().nullable(),
})
export type TextInstruction = z.infer<typeof textInstructionSchema>;
export interface TextInstructionState extends InstructionState, TextInstruction {

}