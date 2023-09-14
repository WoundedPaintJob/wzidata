import { z } from "zod";

export enum InstructionType {
  ConquerZone,
  ConquerBonus,
  Text
}

export const instructionTypeSchema = z.nativeEnum(InstructionType);