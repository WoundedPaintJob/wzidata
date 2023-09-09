import { assetSchema, AssetState } from '@lib/types/assets';
import { z } from 'zod';

export const smelterSchema = assetSchema.extend({});
export type Smelter = z.infer<typeof smelterSchema>;
export interface SmelterState extends AssetState, Smelter {}
