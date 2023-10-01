import { ZoneState } from "@features/zone/lib/types";
import { BestCacheProps } from "../lib/types";
import { BonusState } from "@features/bonus/lib/types";
import useLevelStore from "@lib/stores/levelStore";
import StatRow from "@components/atoms/statrow";
import { formatNumber } from "@helpers/numberHelper";
import { totalCostForZone } from "@features/hospital/lib/helper";
import { formatName } from "@helpers/nameHelper";
const BestCache = (props: BestCacheProps) => {
  const setActiveZone = useLevelStore((state) => state.SetActiveZone);
  const setActiveBonus = useLevelStore((state) => state.SetActiveBonus);

  const unconqueredZones = props.zones.filter((z) => !z.Conquered);
  const conqueredZones = props.zones.filter((z) => z.Conquered);
  let bestCacheZone: ZoneState | null = null;
  let bestCacheZoneCost = 1e100;
  props.cacheZones.forEach((zone) => {
    const cost = totalCostForZone(
      zone,
      props.conqueredHospitals,
      props.hospitalMultiplier,
      props.jointStrikeMultiplier,
      conqueredZones.filter((z) => zone.ConnectedZones.includes(z.Id)).length >
        1
    );
    if (bestCacheZone == null) {
      bestCacheZone = zone;
      bestCacheZoneCost = cost;
    } else if (cost == 0) {
      if (bestCacheZoneCost == 0) {
        if (
          props.rewardProperty(zone.Reward) >
          props.rewardProperty(bestCacheZone.Reward)
        ) {
          bestCacheZone = zone;
          bestCacheZoneCost = cost;
        }
      } else {
        bestCacheZone = zone;
        bestCacheZoneCost = cost;
      }
    } else if (
      bestCacheZoneCost > 0 &&
      props.rewardProperty(zone.Reward) / cost >
        props.rewardProperty(bestCacheZone.Reward) / bestCacheZoneCost
    ) {
      bestCacheZone = zone;
      bestCacheZoneCost = cost;
    }
  });

  let bestCacheBonus: BonusState | null = null;
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
  let returnMode = "none";
  if (bestCacheZone != null && bestCacheBonus != null) {
    const bestBonus = bestCacheBonus as BonusState;
    const bestZone = bestCacheZone as ZoneState;
    if (bestCacheBonusCost == 0) {
      if (bestCacheZoneCost == 0) {
        if (
          props.rewardProperty(bestBonus.Reward) >
          props.rewardProperty(bestZone.Reward)
        )
          returnMode = "bonus";
        else returnMode = "zone";
      } else returnMode = "bonus";
    } else if (bestCacheZoneCost == 0) returnMode = "zone";
    else {
      if (
        props.rewardProperty(bestBonus.Reward) / bestCacheBonusCost >
        props.rewardProperty(bestZone.Reward) / bestCacheZoneCost
      )
        returnMode = "bonus";
      else returnMode = "zone";
    }
  } else if (bestCacheBonus == null) returnMode = "zone";
  else if (bestCacheZone == null) returnMode = "bonus";

  if (returnMode == "bonus" && bestCacheBonus) {
    const bonus = bestCacheBonus as BonusState;
    return (
      <StatRow
        name={`${formatName(bonus.Name)} (B)`}
        value={formatNumber(
          props.rewardProperty(bonus.Reward) * props.cacheMultiplier
        )}
        percentage={formatNumber(bestCacheBonusCost)}
        onClick={() => setActiveBonus(bonus)}
      />
    );
  }
  if (returnMode == "zone" && bestCacheZone) {
    const zone = bestCacheZone as ZoneState;
    return (
      <StatRow
        name={`${formatName(zone.Name)}`}
        value={formatNumber(
          props.rewardProperty(zone.Reward) * props.cacheMultiplier
        )}
        percentage={formatNumber(bestCacheZoneCost)}
        onClick={() => setActiveZone(zone)}
      />
    );
  }
  return <></>;
};

export default BestCache;
