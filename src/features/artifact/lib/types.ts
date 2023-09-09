import { z } from 'zod';
import { ArtifactRarity, artifactTypeSchema } from './enums';

export const artifactSchema = z.object({
  Name: z.string(),
  Description: z.string(),
  Values: z.array(z.number()),
  IsActive: z.boolean(),
  IsPercentage: z.boolean(),
  Type: artifactTypeSchema,
  Image: z.string(),
});

export type Artifact = z.infer<typeof artifactSchema>;

export interface ArtifactState extends Artifact {
  Rarity: ArtifactRarity;
  Owned: boolean;
}
