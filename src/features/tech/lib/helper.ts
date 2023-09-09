import { TechDisplayMode } from '@features/overview/lib/types';
import { TechState } from './types';
import { TechType } from './enums';

export function getTechsToDisplay(techs: TechState[], mode: TechDisplayMode) {
  if (mode == TechDisplayMode.Total) return techs;
  const res: TechState[] = [];
  if (
    mode == TechDisplayMode.Market ||
    mode == TechDisplayMode.MarketPlusArmy
  ) {
    techs.forEach((tech) => {
      if (marketTechs.includes(tech.Type) || smeltTechs.includes(tech.Name))
        res.push(tech);
    });
  }
  if (mode == TechDisplayMode.MarketPlusArmy) {
    techs.forEach((tech) => {
      if (armyTechs.includes(tech.Type)) res.push(tech);
    });
  }
  return res;
}
const armyTechs = [TechType.ArmyCampProduction, TechType.DraftValues];
const marketTechs = [
  TechType.AlloySellValues,
  TechType.OreSellValues,
  TechType.ItemSellValues,
  TechType.CanDraft,
  TechType.MercenaryDiscount,
  TechType.HospitalEffect,
  TechType.HospitalUpgradeCost,
  TechType.CacheProduction,
];
const smeltTechs = ['Faster Smelters', 'Faster Crafters', 'Efficient Smelters'];
