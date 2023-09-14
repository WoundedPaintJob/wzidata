import { InstructionState, instructionSchema } from "./instruction";
import { z } from 'zod'
export const conquerZoneInstructionSchema = instructionSchema.extend({
  ZoneIds: z.array(z.number()),
})
export type ConquerZoneInstruction = z.infer<typeof conquerZoneInstructionSchema>;
export interface ConquerZoneInstructionState extends InstructionState, ConquerZoneInstruction {

}