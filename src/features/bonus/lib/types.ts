import { rewardSchema } from '@features/reward/lib/types';
import { svgSchema } from '@lib/types/image';
import { z } from 'zod';

export const bonusSchema = z.object({
  ZoneIds: z.array(z.number()),
  Svg: svgSchema.nullable(),
  Name: z.string(),
  Reward: rewardSchema,
  Id: z.number(),
});
export type Bonus = z.infer<typeof bonusSchema>;
export interface BonusState extends Bonus {
  Conquered: boolean;
  IsActive: boolean;
}

export interface BonusProps {
  Bonuses: Map<number, BonusState>;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BonusSlice extends BonusProps {
  ConquerBonus: (bonus: BonusState) => void;
}
