import { ArmyCampState, SuperCampState } from "./types";
import { isAssetConquered } from "@helpers/assetHelper";
import { ZoneState } from "@features/zone/lib/types";
import { BonusState } from "@features/bonus/lib/types";

export function armiesProducedAtLevel(
  armyCamp: ArmyCampState,
  revision?: number,
  level?: number
): number {
  const lvl = level || armyCamp.Level;
  const num = lvl + armyCamp.BaseLevel;
  const numSquared = num * num;
  const multi = armyCamp.SuperCharged ? 20 : 1;
  if (revision !== undefined) {
    if (revision < 8) return multi * (1.5 * numSquared + 1.1 * num + 3.0);
    if (revision < 10) return multi * (1.5 * numSquared + 10.0 * num + 3.0);
  }

  return multi * (3.0 * numSquared + num + 3.0);
}

export function getTotalArmyCampProduction(
  armyCamps: ArmyCampState[],
  superCamp: SuperCampState,
  zones: Map<number, ZoneState>,
  bonuses: Map<number, BonusState>,
  multiplier: number,
  revision: number,
  superCampMultiplier: number
) {
  let totalProduced =
    superCamp.Levels[superCamp.Level - 1].Produced *
    multiplier *
    superCampMultiplier;
  armyCamps.forEach((camp) => {
    if (isAssetConquered(camp, zones, bonuses)) {
      totalProduced += armiesProducedAtLevel(camp, revision) * multiplier;
    }
  });
  return totalProduced;
}
