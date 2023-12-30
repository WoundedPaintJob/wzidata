import { InstructionState, instructionSchema } from "./instruction";
import { z } from 'zod'
export const conquerZoneInstructionSchema = instructionSchema.extend({
  ZoneId: z.number(),
})
export type ConquerZoneInstruction = z.infer<typeof conquerZoneInstructionSchema>;
export interface ConquerZoneInstructionState extends InstructionState, ConquerZoneInstruction {

}