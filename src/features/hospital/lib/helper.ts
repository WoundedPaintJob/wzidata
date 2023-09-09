import { HospitalState } from "@features/hospital/lib/types";
import { ZoneState } from "@features/zone/lib/types";

export function hospitalsSavedAtLevel(
  hospital: HospitalState,
  level?: number
): number {
  const lvl = level || hospital.Level;
  return hospital.BaseArmiesSaved * (0.3 * lvl * lvl + 0.7);
}

export function hospitalSaveForZone(hospital: HospitalState, zone: ZoneState): number {
  if (hospital.NearbyZones.some((z) => z == zone.Id))
    return hospitalsSavedAtLevel(hospital) * 2;
  return hospitalsSavedAtLevel(hospital);
}
export function totalCostForZone(
  zone: ZoneState,
  conqueredHospitals: HospitalState[],
  hospitalSaveMultiplier: number,
  jointStrikeMultiplier: number,
  useJointStrike: boolean
): number {
  let totalSaved = 0;
  conqueredHospitals.map((hospital) => {
    totalSaved += hospitalSaveForZone(hospital, zone) * hospitalSaveMultiplier;
  });
  let cost = Math.max(zone.Cost - totalSaved, 0);
  if (useJointStrike) cost *= jointStrikeMultiplier;
  return cost;
}
