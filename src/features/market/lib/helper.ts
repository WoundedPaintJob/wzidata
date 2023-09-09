import { MarketState } from './types';
import { MaterialKind } from '@features/material/lib/enums';

export function getMarketMoneyEstimate(
  market: MarketState,
  bestMaterialPrice: number,
  alloyMultiplier: number,
  itemMultiplier: number
) {
  let costFactor = market.Multiplier;
  const multiplierIncrease = market.BestMaterial.Multiplier;
  const multiplier = market.BestMaterial.Kind == MaterialKind.Alloy ? alloyMultiplier : itemMultiplier;
  const basePrice = bestMaterialPrice;
  let money = basePrice;
  const totalMultiplier = costFactor * basePrice;
  while (costFactor < multiplier) {
    const discriminant = Math.sqrt(
      totalMultiplier * totalMultiplier +
      2 * basePrice * multiplierIncrease * money
    );
    const maxCanAfford = Math.floor(
      (-totalMultiplier + discriminant) / (basePrice * multiplierIncrease)
    );
    if (maxCanAfford == 0) return money;
    const originalPrice = basePrice * costFactor;
    const increasePrice =
      basePrice * (costFactor + multiplierIncrease * maxCanAfford);
    costFactor += multiplierIncrease * maxCanAfford;
    const totalCost = (maxCanAfford * (originalPrice + increasePrice)) / 2;
    money -= totalCost;
    const sellPrice = maxCanAfford * basePrice * multiplier;
    money += sellPrice;
  }
  return money;
}
