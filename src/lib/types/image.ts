import { z } from 'zod';

export const pointSchema = z.object({
  X: z.number(),
  Y: z.number(),
});
export type Point = z.infer<typeof pointSchema>;

export const shapeSchema = z.object({
  Path: z.string(),
});
export type Shape = z.infer<typeof shapeSchema>;

export const svgSchema = z.object({
  Center: pointSchema,
  Shapes: z.array(shapeSchema),
});
export type SVG = z.infer<typeof svgSchema>;
