import { totalCostForZone } from "@features/hospital/lib/helper";
import { HospitalState } from "@features/hospital/lib/types";
import { MapPath } from "@features/path/lib/types";
import { ZoneState } from "@features/zone/lib/types";
import { PathZone } from "./types";

export function reversePath(
  endZone: ZoneState,
  allZones: Map<number, ZoneState>,
  hospitalMultiplier: number,
  jointStrikeMultiplier: number,
  hospitals: HospitalState[]
): MapPath {
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
        ArmiesRequired: 0,
        Zones: [],
      };
      const zones = reconstructPath(endZone, current, parentZone);
      zones.reverse().forEach((zone, index) => {
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
        if (index < zones.length) path.ArmiesRequired += cost;
        else path.ArmiesRequired += zone.Zone.Cost;
        path.Zones.push(zone.Zone);
        zone.Counted = true;
      });
      return evaluateModifyPath(
        path,
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
  return { TotalCost: Infinity, ArmiesRequired: Infinity, Zones: [] };
}
function evaluateModifyPath(
  path: MapPath,
  allZones: Map<number, ZoneState>,
  hospitalMultiplier: number,
  jointStrikeMultiplier: number,
  hospitals: HospitalState[]
) {
  let keepGoing = true;
  while (keepGoing) {
    const numberOfZones = path.Zones.length;
    path = evaluateCaptureNeighbours(
      path,
      allZones,
      hospitalMultiplier,
      jointStrikeMultiplier,
      hospitals
    );
    path = evaluateRemoveNeighbours(
      path,
      allZones,
      hospitalMultiplier,
      jointStrikeMultiplier,
      hospitals
    );
    if (numberOfZones == path.Zones.length) keepGoing = false;
  }
  return path;
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
    const nextOldUseJs =
      nextZone.ConnectedZones.filter((z) => {
        return (
          allZones.get(z)?.Conquered ||
          path.Zones.slice(0, i + 1).filter((iz) => iz.Id == z).length > 0
        );
      }).length > 1;
    const nextOldCost = totalCostForZone(
      nextZone,
      hospitals,
      hospitalMultiplier,
      jointStrikeMultiplier,
      nextOldUseJs
    );
    let bestCost = 0;
    let bestNeighbor: ZoneState | null = null;
    for (const neighborId of currentZone.ConnectedZones) {
      const neighbor = allZones.get(neighborId);
      if (!neighbor || path.Zones.includes(neighbor) || neighbor.Conquered)
        continue;
      const neighbourUseJs =
        neighbor.ConnectedZones.filter((z) => {
          return (
            allZones.get(z)?.Conquered ||
            path.Zones.slice(0, i + 1).filter((iz) => iz.Id == z).length > 0
          );
        }).length > 1;
      const neighborCost = totalCostForZone(
        neighbor,
        hospitals,
        hospitalMultiplier,
        jointStrikeMultiplier,
        neighbourUseJs
      );
      const nextUseJs =
        nextZone.ConnectedZones.filter((z) => {
          return (
            allZones.get(z)?.Conquered ||
            path.Zones.slice(0, i + 1).filter((iz) => iz.Id == z).length > 0 ||
            neighbor.Id == z
          );
        }).length > 1;
      const nextCost = totalCostForZone(
        nextZone,
        hospitals,
        hospitalMultiplier,
        jointStrikeMultiplier,
        nextUseJs
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
      return path;
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
          path.Zones.slice(0, i + 1).filter((iz) => iz.Id == z).length > 1 ||
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
              path.Zones.slice(0, i + 1).filter((iz) => iz.Id == z).length > 0)
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
            path.Zones.slice(0, i + 1).filter((iz) => iz.Id == z).length > 0
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
              path.Zones.slice(0, i + 1).filter((iz) => iz.Id == z).length > 0)
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
