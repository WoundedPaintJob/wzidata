import { AdvancementState } from './types';

export function getCostForAdvancement(
  advancement: AdvancementState,
  level: number
) {
  if (level == -1) return 0;
  let cost = advancement.CostToUnlock;
  if (level > 0)
    cost +=
      advancement.CostFirstUpgrade * level +
      0.5 * level * (level - 1) * advancement.CostIncreasePerUpgrade;
  return cost;
}
export function getAdvancementValue(advancement: AdvancementState) {
  if (advancement.Level == -1) return 0;
  return (
    advancement.ValueInitial + advancement.ValueIncrease * advancement.Level
  );
}
