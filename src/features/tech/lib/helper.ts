import { TechDisplayMode } from "@features/overview/lib/types";
import { TechState } from "./types";
import { TechType } from "./enums";
import { Material } from "@features/material/lib/types";

export function getTotalTechCost(
  techs: TechState[][],
  mode: TechDisplayMode,
  techDiscountMultiplier: number
) {
  const materials: Material[] = [];
  techs.flat().forEach((tech) => {
    if (!tech.Bought && isTechInteresting(tech, mode)) {
      tech.Materials.forEach((mat) => {
        if (!materials.some((m) => m.Type == mat.Type)) {
          materials.push({
            Name: mat.Name,
            Image: mat.Image,
            Type: mat.Type,
            Amount: 0,
            Cost: mat.Cost,
            Kind: mat.Kind,
            Multiplier: mat.Multiplier,
          });
        }
        const newMat = materials.find((m) => m.Type == mat.Type);
        if (newMat)
          newMat.Amount += Math.ceil(mat.Amount * techDiscountMultiplier);
      });
    }
  });
  return materials;
}
export function isTechInteresting(tech: TechState, mode: TechDisplayMode) {
  if (mode == TechDisplayMode.Total) return true;
  if (
    (mode == TechDisplayMode.Market ||
      mode == TechDisplayMode.MarketPlusArmy) &&
    (marketTechs.includes(tech.Type) || smeltTechs.includes(tech.Name))
  )
    return true;
  if (mode == TechDisplayMode.MarketPlusArmy && armyTechs.includes(tech.Type))
    return true;
  return false;
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
const smeltTechs = ["Faster Smelters", "Faster Crafters", "Efficient Smelters"];
