import { z } from "zod";

export enum InstructionType {
  ConquerZone
}

export const instructionTypeSchema = z.nativeEnum(InstructionType);