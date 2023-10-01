import { TechDisplayMode } from "@features/overview/lib/types";
import { TechState } from "./types";
import { TechType } from "./enums";
import { Material } from "@features/material/lib/types";
import { MarketState } from "@features/market/lib/types";
export function getBuyableTechs(
  techs: TechState[][],
  mode: TechDisplayMode,
  ownedMarkets: MarketState[]
) {
  const buyable: TechState[] = [];
  for (let r = 0; r < 12; r++) {
    if (techs[r]) {
      for (let c = 0; c < 10; c++) {
        if (techs[r][c] && isTechInteresting(techs[r][c], mode)) {
          if (!techs[r][c].Bought) {
            if (isTechAvailable(techs, r, c, buyable)) {
              let allPossible = true;
              techs[r][c].Materials.forEach((mat) => {
                let matPossible = false;
                ownedMarkets.forEach((market) => {
                  if (market.Materials.find(m => m.Type == mat.Type)) matPossible = true;
                })
                if (!matPossible)
                  allPossible = false;
              })
              if (allPossible)
                buyable.push(techs[r][c]);
            }
          }
        }
      }
    }
  }
  return buyable;
}
export function isTechAvailable(
  techs: TechState[][],
  row: number,
  column: number,
  buyable: TechState[]
) {
  if (row == 0) return true;
  const techAbove = techs[row - 1][column];
  const buyableAbove = buyable.find((t) => t.Row == row - 1 && t.Column == column);
  const techLeft = column == 0 ? undefined : techs[row][column - 1];
  const buyableLeft = buyable.find((t) => t.Row == row && t.Column == column - 1);
  if (buyableAbove || buyableLeft) return true;
  if (techAbove) return techAbove.Bought;
  if (techLeft) return techLeft.Bought;
  return false;
}
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
