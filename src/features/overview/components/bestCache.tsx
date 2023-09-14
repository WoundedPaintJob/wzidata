import { ZoneState } from "@features/zone/lib/types";
import { BestCacheProps } from "../lib/types";
import { BonusState } from "@features/bonus/lib/types";
import useLevelStore from "@lib/stores/levelStore";
import StatRow from "@components/atoms/statrow";
import { formatNumber } from "@helpers/numberHelper";
import { totalCostForZone } from "@features/hospital/lib/helper";
const BestCache = (props: BestCacheProps) => {
  const setActiveZone = useLevelStore((state) => state.SetActiveZone);
  const setActiveBonus = useLevelStore((state) => state.SetActiveBonus);

  const unconqueredZones = props.zones.filter((z) => !z.Conquered);
  const conqueredZones = props.zones.filter((z) => z.Conquered);
  let bestCacheZone: ZoneState = null;
  let bestCacheZoneCost = 1e100;
  if (props.cacheZones.length > 0) {
    props.cacheZones.forEach((zone) => {
      const cost = totalCostForZone(
        zone,
        props.conqueredHospitals,
        props.hospitalMultiplier,
        props.jointStrikeMultiplier,
        conqueredZones.filter((z) => zone.ConnectedZones.includes(z.Id))
          .length > 1
      );
      if (bestCacheZone == null) {
        bestCacheZone = zone;
        bestCacheZoneCost = cost;
      } else if (cost == 0) {
        if (bestCacheZoneCost == 0) {
          if (
            props.rewardProperty(zone.Reward) >
            props.rewardProperty(zone.Reward)
          ) {
            bestCacheZone = zone;
            bestCacheZoneCost = cost;
          }
        } else {
          bestCacheZone = zone;
          bestCacheZoneCost = cost;
        }
      } else if (
        props.rewardProperty(zone.Reward) > props.rewardProperty(zone.Reward)
      ) {
        bestCacheZone = zone;
        bestCacheZoneCost = cost;
      }
    });
  }

  let bestCacheBonus: BonusState = null;
  let bestCacheBonusCost = 1e100;
  if (props.cacheBonuses.length > 0) {
    props.cacheBonuses.forEach((bonus) => {
      let cost = 0;
      const remainingZonesInBonus = unconqueredZones.filter((z) =>
        bonus.ZoneIds.includes(z.Id)
      );
      remainingZonesInBonus.forEach((zone) => {
        cost += totalCostForZone(
          zone,
          props.conqueredHospitals,
          props.hospitalMultiplier,
          props.jointStrikeMultiplier,
          conqueredZones.filter((z) => zone.ConnectedZones.includes(z.Id))
            .length > 1
        );
      });
      if (bestCacheBonus == null) {
        bestCacheBonus = bonus;
        bestCacheBonusCost = cost;
      } else if (cost == 0) {
        if (bestCacheBonusCost == 0) {
          if (
            props.rewardProperty(bonus.Reward) / cost >
            props.rewardProperty(bestCacheBonus.Reward) / bestCacheBonusCost
          ) {
            bestCacheBonus = bonus;
            bestCacheBonusCost = cost;
          }
        } else {
          bestCacheBonus = bonus;
          bestCacheBonusCost = cost;
        }
      } else if (
        bestCacheBonusCost > 0 &&
        props.rewardProperty(bonus.Reward) / cost >
        props.rewardProperty(bestCacheBonus.Reward) / bestCacheBonusCost
      ) {
        bestCacheBonus = bonus;
        bestCacheBonusCost = cost;
      }
    });
  }
  if (
    bestCacheZone !== null &&
    bestCacheBonus !== null &&
    props.rewardProperty(bestCacheBonus.Reward) / bestCacheBonusCost >
    props.rewardProperty(bestCacheZone.Reward) / bestCacheZoneCost
  ) {
    return (
      <StatRow
        name={`${bestCacheBonus.Name} (B)`}
        value={formatNumber(
          props.rewardProperty(bestCacheBonus.Reward) * props.cacheMultiplier
        )}
        percentage={formatNumber(bestCacheBonusCost)}
        onClick={() => setActiveBonus(bestCacheBonus)}
      />
    );
  } else if (bestCacheZone != null) {
    return (
      <StatRow
        name={`${bestCacheZone.Name}`}
        value={formatNumber(
          props.rewardProperty(bestCacheZone.Reward) * props.cacheMultiplier
        )}
        percentage={formatNumber(bestCacheZoneCost)}
        onClick={() => setActiveZone(bestCacheZone)}
      />
    );
  } else if (bestCacheBonus != null) {
    return (
      <StatRow
        name={`${bestCacheBonus.Name} (B)`}
        value={formatNumber(
          props.rewardProperty(bestCacheBonus.Reward) * props.cacheMultiplier
        )}
        percentage={formatNumber(bestCacheBonusCost)}
        onClick={() => setActiveBonus(bestCacheBonus)}
      />
    );
  }
  return <></>;
};

export default BestCache;
