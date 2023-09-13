import { InstructionState, instructionSchema } from "./instruction";
import { z } from 'zod'
export const conquerBonusnstructionSchema = instructionSchema.extend({
  bonusId: z.number(),
})
export type ConquerBonusInstruction = z.infer<typeof conquerBonusnstructionSchema>;
export interface ConquerBonusInstructionState extends InstructionState, ConquerBonusInstruction {

}