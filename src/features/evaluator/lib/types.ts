export interface EvaluatorArmyCardProps {
  totalArmiesRemaining: number;
  hospitalSaves: number;
  estimatedRemainingCost: number;
  hospitalMultiplier: number;
  jointStrikeMultiplier: number;
}
export interface EvaluatorCacheCardProps {
  remainingArmyCache: number;
  remainingMoneyCache: number;
  remainingResourceCache: number;
  armyCacheMultiplier: number;
  moneyCacheMultiplier: number;
  resourceCacheMultiplier: number;
}

export interface EvaluatorMercenaryCardProps {
  remainingCost: number;
  remainingMercenaries: number;
  mercenaryMultiplier: number;
  mercnaryCostMultiplier: number;
}
