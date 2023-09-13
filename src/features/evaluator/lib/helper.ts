import { ZoneState } from "@features/zone/lib/types";
import {
  EvaluatorArmyCardProps,
  EvaluatorCacheCardProps,
  EvaluatorMercenaryCardProps,
} from "./types";
import { HospitalState } from "@features/hospital/lib/types";
import {
  hospitalsSavedAtLevel,
  totalCostForZone,
} from "@features/hospital/lib/helper";
import { BonusState } from "@features/bonus/lib/types";
import { MaterialKind, MaterialType } from "@features/material/lib/enums";
import { MaterialState } from "@features/material/lib/types";

export function getArmyCardProps(
  unconqueredZones: ZoneState[],
  conqueredHospitals: HospitalState[],
  hospitalMultiplier: number,
  jointStrikeMultiplier: number
): EvaluatorArmyCardProps {
  let armiesRemaining = 0;
  unconqueredZones.forEach((zone) => (armiesRemaining += zone.Cost));
  let hospitalSaves = 0;
  conqueredHospitals.forEach(
    (hospital) =>
      (hospitalSaves += hospitalsSavedAtLevel(hospital) * hospitalMultiplier)
  );
  let estimatedRemainingCost = 0;
  unconqueredZones.forEach((zone) => {
    let cost = totalCostForZone(
      zone,
      conqueredHospitals,
      hospitalMultiplier,
      1,
      false
    );
    if (zone.ConnectedZones.length > 1) cost *= jointStrikeMultiplier;
    estimatedRemainingCost += cost;
  });
  return {
    totalArmiesRemaining: armiesRemaining,
    hospitalSaves: hospitalSaves,
    estimatedRemainingCost: estimatedRemainingCost,
    hospitalMultiplier: hospitalMultiplier,
    jointStrikeMultiplier: jointStrikeMultiplier,
  };
}

export function getCacheCardProps(
  unconqueredZones: ZoneState[],
  unconqueredBonuses: BonusState[],
  armyCacheMultiplier: number,
  moneyCacheMultiplier: number,
  resourceCacheMultiplier: number,
  oreMultiplier: number,
  alloyMultiplier: number,
  itemMultiplier: number,
  materials: Map<MaterialType, MaterialState>
): EvaluatorCacheCardProps {
  let totalArmyCache = 0;
  let totalMoneycache = 0;
  let totalResourceCache = 0;
  unconqueredZones
    .filter((z) => z.Reward && z.Reward.Cache)
    .forEach((zone) => {
      if (zone.Reward && zone.Reward.Cache && zone.Reward.Cache.Armies)
        totalArmyCache += zone.Reward.Cache.Armies * armyCacheMultiplier;
      if (zone.Reward && zone.Reward.Cache && zone.Reward.Cache.Money)
        totalMoneycache += zone.Reward.Cache.Money * moneyCacheMultiplier;
      if (zone.Reward && zone.Reward.Cache && zone.Reward.Cache.Materials) {
        zone.Reward.Cache.Materials.forEach((mat) => {
          const stateMat = materials.get(mat.Type);
          if (!stateMat) return;
          if (mat.Kind == MaterialKind.Ore) {
            totalResourceCache +=
              mat.Amount *
              resourceCacheMultiplier *
              stateMat.Cost *
              oreMultiplier;
          }
          if (mat.Kind == MaterialKind.Alloy) {
            totalResourceCache +=
              mat.Amount *
              resourceCacheMultiplier *
              stateMat.Cost *
              alloyMultiplier;
          }
          if (mat.Kind == MaterialKind.Item) {
            totalResourceCache +=
              mat.Amount *
              resourceCacheMultiplier *
              stateMat.Cost *
              itemMultiplier;
          }
        });
      }
    });
  unconqueredBonuses
    .filter((b) => b.Reward && b.Reward.Cache)
    .forEach((bonus) => {
      if (bonus.Reward && bonus.Reward.Cache && bonus.Reward.Cache.Armies)
        totalArmyCache += bonus.Reward.Cache.Armies * armyCacheMultiplier;
      if (bonus.Reward && bonus.Reward.Cache && bonus.Reward.Cache.Money)
        totalMoneycache += bonus.Reward.Cache.Money * moneyCacheMultiplier;
      if (bonus.Reward && bonus.Reward.Cache && bonus.Reward.Cache.Materials) {
        bonus.Reward.Cache.Materials.forEach((mat) => {
          const stateMat = materials.get(mat.Type);
          if (!stateMat) return;
          if (mat.Kind == MaterialKind.Ore) {
            totalResourceCache +=
              mat.Amount *
              resourceCacheMultiplier *
              stateMat.Cost *
              oreMultiplier;
          }
          if (mat.Kind == MaterialKind.Alloy) {
            totalResourceCache +=
              mat.Amount *
              resourceCacheMultiplier *
              stateMat.Cost *
              alloyMultiplier;
          }
          if (mat.Kind == MaterialKind.Item) {
            totalResourceCache +=
              mat.Amount *
              resourceCacheMultiplier *
              stateMat.Cost *
              itemMultiplier;
          }
        });
      }
    });
  return {
    remainingArmyCache: totalArmyCache,
    remainingMoneyCache: totalMoneycache,
    remainingResourceCache: totalResourceCache,
    armyCacheMultiplier: armyCacheMultiplier,
    moneyCacheMultiplier: moneyCacheMultiplier,
    resourceCacheMultiplier: resourceCacheMultiplier,
  };
}

export function getMercenaryCardProps(
  unconqueredZones: ZoneState[],
  unconqueredBonuses: BonusState[],
  mercenaryMultiplier: number,
  mercenaryDiscountMultiplier: number
): EvaluatorMercenaryCardProps {
  let remainingMercenaries = 0;
  let remainingCost = 0;
  unconqueredZones
    .forEach((zone) => {
      if (!zone.Reward || !zone.Reward.MercenaryCamp) return;
      remainingMercenaries +=
        zone.Reward.MercenaryCamp.ArmiesLeft * mercenaryMultiplier;
      remainingCost +=
        zone.Reward.MercenaryCamp.CostPerArmy *
        zone.Reward.MercenaryCamp.ArmiesLeft *
        mercenaryMultiplier *
        mercenaryDiscountMultiplier;
    });
  unconqueredBonuses
    .forEach((bonus) => {
      if (!bonus.Reward || !bonus.Reward.MercenaryCamp) return;
      remainingMercenaries +=
        bonus.Reward.MercenaryCamp.ArmiesLeft * mercenaryMultiplier;
      remainingCost +=
        bonus.Reward.MercenaryCamp.CostPerArmy *
        bonus.Reward.MercenaryCamp.ArmiesLeft *
        mercenaryMultiplier *
        mercenaryDiscountMultiplier;
    });
  return {
    remainingMercenaries: remainingMercenaries,
    remainingCost: remainingCost,
    mercenaryMultiplier: mercenaryMultiplier,
    mercnaryCostMultiplier: mercenaryDiscountMultiplier,
  };
}
