import { assetSchema, AssetState } from '@lib/types/assets';
import { z } from 'zod';

export const crafterSchema = assetSchema.extend({});
export type Crafter = z.infer<typeof crafterSchema>;

export interface CrafterState extends AssetState, Crafter {}
