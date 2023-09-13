import { hospitalSaveForZone } from '@features/hospital/lib/helper';
import { HospitalState } from '@features/hospital/lib/types';
import { MapPath } from '@features/path/lib/types';
import { ZoneState } from '@features/zone/lib/types';

function getHeuristics(zone1: ZoneState, zone2: ZoneState): number {
  const dX = Math.abs(zone1.Center.X - zone2.Center.X);
  const dY = Math.abs(zone1.Center.Y - zone2.Center.Y);
  return dX + dY;
}
export function getCheapestPath(
  endZone: ZoneState,
  allZones: Map<number, ZoneState>,
  hospitalMultiplier: number,
  jointStrikeMultiplier: number,
  hospitals: HospitalState[]
): MapPath {
  const conqueredZones = Array.from(allZones.values()).filter(
    (z) => z.Conquered
  );
  let cheapestPath = getPath(
    conqueredZones[0],
    endZone,
    allZones,
    hospitalMultiplier,
    jointStrikeMultiplier,
    hospitals
  );
  conqueredZones.forEach((z) => {
    const path = getPath(
      z,
      endZone,
      allZones,
      hospitalMultiplier,
      jointStrikeMultiplier,
      hospitals
    );
    if (
      path.TotalCost < cheapestPath.TotalCost ||
      (path.TotalCost == cheapestPath.TotalCost &&
        path.Zones.length < cheapestPath.Zones.length)
    ) {
      cheapestPath = path;
    }
  });
  return cheapestPath;
}
export function getPath(
  startZone: ZoneState,
  endZone: ZoneState,
  all: Map<number, ZoneState>,
  hospitalMultiplier: number,
  jointStrikeMultiplier: number,
  hospitals: HospitalState[]
): MapPath {
  let openSet: ZoneState[] = [startZone];
  const closedSet: ZoneState[] = [];
  const heuristics = new Map<ZoneState, number>();
  const costs = new Map<ZoneState, number>();
  const parentZone = new Map<ZoneState, ZoneState>();
  all.forEach((zone) => {
    costs.set(zone, zone.Cost);
    heuristics.set(zone, getHeuristics(zone, endZone));
  });
  while (openSet.length > 0) {
    let current = openSet.reduce((prev, curr) =>
      (costs.get(prev) ?? 0) + (heuristics.get(prev) ?? 0) <
        (costs.get(curr) ?? 0) + (heuristics.get(curr) ?? 0)
        ? prev
        : curr
    );
    if (current == endZone) {
      const path: MapPath = {
        TotalCost: 0,
        Zones: [],
      };
      let stop = false;
      while (!stop) {
        if (current != startZone) {
          let cost = current.Cost;
          let hospitalSaves = 0;
          hospitals.forEach(
            (h) =>
              (hospitalSaves +=
              hospitalSaveForZone(h, current) * hospitalMultiplier)
          );
          cost -= hospitalSaves;
          cost = Math.max(cost, 0);
          if (current.ConnectedZones.length > 1) cost *= jointStrikeMultiplier;
          path.TotalCost += cost;
        }
        path.Zones.unshift(current);
        if (parentZone.has(current))
          current = parentZone.get(current) ?? current;
        else stop = true;
      }
      return path;
    }
    openSet = openSet.filter((zone) => zone != current);
    closedSet.push(current);
    for (const neighborId of current.ConnectedZones) {
      const neighbor = all.get(neighborId);
      if (!neighbor) continue;
      if (closedSet.includes(neighbor)) continue;
      const tentative = (costs.get(current) ?? 0) + (costs.get(neighbor) ?? 0);
      if (!openSet.includes(neighbor)) {
        openSet.push(neighbor);
      } else if (tentative >= (costs.get(neighbor) ?? 0)) {
        continue;
      }
      parentZone.set(neighbor, current);
      costs.set(neighbor, tentative);
      heuristics.set(neighbor, getHeuristics(neighbor, endZone));
    }
  }
  return { TotalCost: 1e100, Zones: [] };
}
