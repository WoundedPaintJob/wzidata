import { InstructionState, instructionSchema } from "./instruction";
import { z } from 'zod'
export const conquerZoneInstructionSchema = instructionSchema.extend({
  zoneId: z.number(),
  doPath: z.boolean()
})
export type ConquerZoneInstruction = z.infer<typeof conquerZoneInstructionSchema>;
export interface ConquerZoneInstructionState extends InstructionState, ConquerZoneInstruction {

}