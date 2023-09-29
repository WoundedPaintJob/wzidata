import { BonusState } from "@features/bonus/lib/types";
import { ZoneState } from "@features/zone/lib/types";

export function calculateMoneyCache(
  zones: Map<number, ZoneState>,
  bonuses: Map<number, BonusState>,
  multiplier: number
) {
  let totalProduced = 0;
  zones.forEach((z) => {
    totalProduced += z.Conquered ? z.Reward.MoneyPerSecond * multiplier : 0;
  });
  bonuses.forEach((b) => {
    totalProduced += b.Conquered ? b.Reward.MoneyPerSecond * multiplier : 0;
  });
  return totalProduced;
}
