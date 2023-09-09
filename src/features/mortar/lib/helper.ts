import { ZoneState } from "@features/zone/lib/types";
import { MortarState } from "./types";

export function mortarGetHitChanceFromDistance(distance: number) {
  switch (distance) {
  case 0:
    return 1;
  case 1:
    return 0.7;
  case 2:
    return 0.5;
  case 3:
    return 0.3;
  case 4:
    return 0.15;
  }
  return 0.0;
}
export function getBestZoneForMortar(
  mortar: MortarState,
  zones: Map<number, ZoneState>
) {
  let bestZone: ZoneState = null;
  let bestReward = 0;
  mortar.NearbyZones.forEach((z) => {
    const zone = zones.get(z.ZoneId);
    if (!zone.Conquered) {
      if (zone.Cost * mortarGetHitChanceFromDistance(z.Distance) > bestReward) {
        bestZone = zone;
        bestReward = zone.Cost * mortarGetHitChanceFromDistance(z.Distance);
      }
    }
  });
  return bestZone;
}
