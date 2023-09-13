import { z } from "zod";

export enum InstructionType {
  ConquerZone,
  ConquerBonus
}

export const instructionTypeSchema = z.nativeEnum(InstructionType);