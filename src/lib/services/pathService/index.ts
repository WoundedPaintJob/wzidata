import {
  totalCostForZone,
} from "@features/hospital/lib/helper";
import { HospitalState } from "@features/hospital/lib/types";
import { MapPath } from "@features/path/lib/types";
import { ZoneState } from "@features/zone/lib/types";
import { PathZone } from "./types";

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
  const conqueredZones = Array.from(allZones.values()).filter((zone) => {
    return (
      zone.Conquered &&
      zone.ConnectedZones.filter((z) => !allZones.get(z)?.Conquered).length > 0
    );
  });
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
  return evaluateRemoveNeighbours(
    evaluateCaptureNeighbours(
      cheapestPath,
      allZones,
      hospitalMultiplier,
      jointStrikeMultiplier,
      hospitals
    ),
    allZones,
    hospitalMultiplier,
    jointStrikeMultiplier,
    hospitals
  );
}
export function reversePath(
  endZone: ZoneState,
  allZones: Map<number, ZoneState>,
  hospitalMultiplier: number,
  jointStrikeMultiplier: number,
  hospitals: HospitalState[]
) {
  const openSet = new Set<ZoneState>();
  openSet.add(endZone);
  const closedSet = new Set<ZoneState>();
  const costs = new Map<ZoneState, number>();
  const parentZone = new Map<ZoneState, ZoneState>();
  allZones.forEach((zone) => {
    costs.set(
      zone,
      totalCostForZone(
        zone,
        hospitals,
        hospitalMultiplier,
        jointStrikeMultiplier,
        zone.ConnectedZones.filter((z) => {
          return allZones.get(z)?.Conquered;
        }).length > 1
      )
    );
  });
  while (openSet.size > 0) {
    let current: ZoneState | undefined;
    let minScore = Infinity;
    openSet.forEach((zone) => {
      const score = costs.get(zone) || 0;
      if (score < minScore) {
        minScore = score;
        current = zone;
      }
    });
    if (!current) throw "No current in path";
    if (current.Conquered) {
      const path: MapPath = {
        TotalCost: 0,
        Zones: [],
      };
      const zones = reconstructPath(endZone, current, parentZone);
      zones.reverse().forEach((zone) => {
        const cost = totalCostForZone(
          zone.Zone,
          hospitals,
          hospitalMultiplier,
          jointStrikeMultiplier,
          zone.Zone.ConnectedZones.filter((z) => {
            return (
              allZones.get(z)?.Conquered ||
              zones.filter((iz) => iz.Counted && iz.Zone.Id == z).length > 0
            );
          }).length > 1
        );
        path.TotalCost += cost;
        path.Zones.push(zone.Zone);
        zone.Counted = true;
      });
      return evaluateRemoveNeighbours(
        evaluateCaptureNeighbours(
          path,
          allZones,
          hospitalMultiplier,
          jointStrikeMultiplier,
          hospitals
        ),
        allZones,
        hospitalMultiplier,
        jointStrikeMultiplier,
        hospitals
      );
    }
    closedSet.add(current);
    openSet.delete(current);
    for (const neighborId of current.ConnectedZones) {
      const neighbor = allZones.get(neighborId);
      if (!neighbor) continue;
      if (closedSet.has(neighbor)) continue;
      let tentative = costs.get(current) ?? 0;
      if (!neighbor.Conquered) {
        const newCost = totalCostForZone(
          neighbor,
          hospitals,
          hospitalMultiplier,
          jointStrikeMultiplier,
          false
        );
        tentative += newCost;
      }
      if (!openSet.has(neighbor)) {
        openSet.add(neighbor);
      } else if (tentative >= (costs.get(neighbor) ?? 0)) {
        continue;
      }
      parentZone.set(neighbor, current);
      costs.set(neighbor, tentative);
    }
  }
  return { TotalCost: Infinity, Zones: [] };
}
export function getPath(
  startZone: ZoneState,
  endZone: ZoneState,
  allZones: Map<number, ZoneState>,
  hospitalMultiplier: number,
  jointStrikeMultiplier: number,
  hospitals: HospitalState[]
): MapPath {
  const openSet = new Set<ZoneState>();
  openSet.add(startZone);
  const closedSet = new Set<ZoneState>();
  const heuristics = new Map<ZoneState, number>();
  const costs = new Map<ZoneState, number>();
  const parentZone = new Map<ZoneState, ZoneState>();
  allZones.forEach((zone) => {
    costs.set(
      zone,
      totalCostForZone(
        zone,
        hospitals,
        hospitalMultiplier,
        jointStrikeMultiplier,
        zone.ConnectedZones.filter((z) => {
          return allZones.get(z)?.Conquered;
        }).length > 1
      )
    );
    heuristics.set(zone, getHeuristics(zone, endZone));
    if (zone.Conquered) closedSet.add(zone);
  });
  while (openSet.size > 0) {
    let current: ZoneState | undefined;
    let minScore = Infinity;
    openSet.forEach((zone) => {
      const score = (costs.get(zone) ?? 0) + (heuristics.get(zone) ?? 0);
      if (score < minScore) {
        minScore = score;
        current = zone;
      }
    });
    if (!current) throw "No current in path";
    if (current === endZone) {
      const path: MapPath = {
        TotalCost: 0,
        Zones: [],
      };
      const zones = reconstructPath(startZone, endZone, parentZone);
      zones.forEach((zone) => {
        const cost = totalCostForZone(
          zone.Zone,
          hospitals,
          hospitalMultiplier,
          jointStrikeMultiplier,
          zone.Zone.ConnectedZones.filter((z) => {
            return (
              allZones.get(z)?.Conquered ||
              zones.filter((iz) => iz.Counted && iz.Zone.Id == z).length > 0
            );
          }).length > 1
        );
        path.TotalCost += cost;
        path.Zones.push(zone.Zone);
        zone.Counted = true;
      });
      return path;
    }
    closedSet.add(current);
    openSet.delete(current);
    for (const neighborId of current.ConnectedZones) {
      const neighbor = allZones.get(neighborId);
      if (!neighbor) continue;
      if (closedSet.has(neighbor)) continue;
      const newCost = totalCostForZone(
        neighbor,
        hospitals,
        hospitalMultiplier,
        jointStrikeMultiplier,
        false
      );
      const tentative = (costs.get(current) ?? 0) + newCost;
      // console.log(pathZones.map((z) => z.Zone.Name));
      // console.log(
      //   `${current.Name}: P: ${
      //     parentZone.get(current)?.Name
      //   } H: ${heuristics.get(current)}
      //   ${neighbor.Name}: ${newCost} - ${tentative}`
      // );
      if (!openSet.has(neighbor)) {
        openSet.add(neighbor);
      } else if (tentative >= (costs.get(neighbor) ?? 0)) {
        continue;
      }
      parentZone.set(neighbor, current);
      costs.set(neighbor, tentative);
    }
  }
  return { TotalCost: Infinity, Zones: [] };
}

function evaluateCaptureNeighbours(
  path: MapPath,
  allZones: Map<number, ZoneState>,
  hospitalMultiplier: number,
  jointStrikeMultiplier: number,
  hospitals: HospitalState[]
) {
  for (let i = 0; i < path.Zones.length; i++) {
    const currentZone = path.Zones[i];
    const nextZone = path.Zones[i + 1];
    if (!nextZone) return path;
    const nextOldCost = totalCostForZone(
      nextZone,
      hospitals,
      hospitalMultiplier,
      jointStrikeMultiplier,
      nextZone.ConnectedZones.filter((z) => {
        return (
          allZones.get(z)?.Conquered ||
          path.Zones.filter((iz) => iz.Id == z).length > 0
        );
      }).length > 1
    );
    let bestCost = 0;
    let bestNeighbor: ZoneState | null = null;
    for (const neighborId of currentZone.ConnectedZones) {
      const neighbor = allZones.get(neighborId);
      if (!neighbor || path.Zones.includes(neighbor) || neighbor.Conquered)
        continue;
      const neighborCost = totalCostForZone(
        neighbor,
        hospitals,
        hospitalMultiplier,
        jointStrikeMultiplier,
        neighbor.ConnectedZones.filter((z) => {
          return (
            allZones.get(z)?.Conquered ||
            path.Zones.filter((iz) => iz.Id == z).length > 0
          );
        }).length > 1
      );
      const nextCost = totalCostForZone(
        nextZone,
        hospitals,
        hospitalMultiplier,
        jointStrikeMultiplier,
        nextZone.ConnectedZones.filter((z) => {
          return (
            allZones.get(z)?.Conquered ||
            path.Zones.filter((iz) => iz.Id == z).length > 0 ||
            neighbor.Id == z
          );
        }).length > 1
      );
      const newCost = nextOldCost - (neighborCost + nextCost);
      if (newCost > bestCost) {
        bestCost = newCost;
        bestNeighbor = neighbor;
      }
    }
    if (bestCost > 0) {
      if (!bestNeighbor) throw "No best neighbor";
      path.Zones.splice(i + 1, 0, bestNeighbor);
      path.TotalCost -= bestCost;
      i++;
    }
  }
  return path;
}
function evaluateRemoveNeighbours(
  path: MapPath,
  allZones: Map<number, ZoneState>,
  hospitalMultiplier: number,
  jointStrikeMultiplier: number,
  hospitals: HospitalState[]
) {
  for (let i = 1; i < path.Zones.length; i++) {
    const currentZone = path.Zones[i];
    const nextZone = path.Zones[i + 1];
    if (!nextZone) return path;
    if (
      nextZone.ConnectedZones.filter((z) => {
        return (
          path.Zones.filter((iz) => iz.Id == z).length > 1 ||
          allZones.get(z)?.Conquered
        );
      }).length > 1
    ) {
      const currentCost = totalCostForZone(
        currentZone,
        hospitals,
        hospitalMultiplier,
        jointStrikeMultiplier,
        currentZone.ConnectedZones.filter((z) => {
          return (
            z != nextZone.Id &&
            (allZones.get(z)?.Conquered ||
              path.Zones.filter((iz) => iz.Id == z).length > 0)
          );
        }).length > 1
      );
      const nextOldCost = totalCostForZone(
        nextZone,
        hospitals,
        hospitalMultiplier,
        jointStrikeMultiplier,
        nextZone.ConnectedZones.filter((z) => {
          return (
            allZones.get(z)?.Conquered ||
            path.Zones.filter((iz) => iz.Id == z).length > 0
          );
        }).length > 1
      );
      const nextNewCost = totalCostForZone(
        nextZone,
        hospitals,
        hospitalMultiplier,
        jointStrikeMultiplier,
        nextZone.ConnectedZones.filter((z) => {
          return (
            z != currentZone.Id &&
            (allZones.get(z)?.Conquered ||
              path.Zones.filter((iz) => iz.Id == z).length > 0)
          );
        }).length > 1
      );
      if (nextOldCost + currentCost > nextNewCost) {
        console.log(`Remove: ${currentZone.Name}`);
      }
    }
  }
  return path;
}

function reconstructPath(
  startZone: ZoneState,
  endZone: ZoneState,
  parentZone: Map<ZoneState, ZoneState>
): PathZone[] {
  const path: PathZone[] = [];
  let currentZone: ZoneState | undefined = endZone;
  while (currentZone && currentZone !== startZone) {
    path.unshift({ Zone: currentZone, Counted: false });
    currentZone = parentZone.get(currentZone);
  }
  if (currentZone === startZone) {
    path.unshift({ Zone: startZone, Counted: true });
  }
  return path;
}
