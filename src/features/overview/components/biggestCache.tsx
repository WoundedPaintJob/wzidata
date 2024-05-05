import { ZoneState } from "@features/zone/lib/types";
import { BiggestCacheProps } from "../lib/types";
import { BonusState } from "@features/bonus/lib/types";
import useLevelStore from "@lib/stores/levelStore";
import StatRow from "@components/atoms/statrow";
import { formatNumber } from "@helpers/numberHelper";

const BiggestCache = (props: BiggestCacheProps) => {
  const setActiveZone = useLevelStore((state) => state.SetActiveZone);
  const setActiveBonus = useLevelStore((state) => state.SetActiveBonus);
  let biggestCacheZone: ZoneState | null = null;
  if (props.cacheZones.length > 0) {
    props.cacheZones.forEach((zone) => {
      if (
        biggestCacheZone == null ||
        props.rewardProperty(zone.Reward) >
        props.rewardProperty(biggestCacheZone.Reward)
      )
        biggestCacheZone = zone;
    });
  }
  let biggestCacheBonus: BonusState | null = null;
  if (props.cacheBonuses.length > 0) {
    props.cacheBonuses.forEach((bonus) => {
      if (
        biggestCacheBonus == null ||
        props.rewardProperty(bonus.Reward) >
        props.rewardProperty(biggestCacheBonus.Reward)
      )
        biggestCacheBonus = bonus;
    });
  }
  if (
    biggestCacheZone != null &&
    biggestCacheBonus != null &&
    props.rewardProperty((biggestCacheBonus as BonusState).Reward) >
    props.rewardProperty((biggestCacheZone as ZoneState).Reward)
  ) {
    const bonus = (biggestCacheBonus as BonusState)
    return (
      <StatRow
        name={`${bonus.Name} (B)`}
        value={formatNumber(
          props.rewardProperty(bonus.Reward)
        )}
        onClick={() => setActiveBonus(bonus)}
      />
    );
  } else if (biggestCacheZone != null) {
    const zone = (biggestCacheZone as ZoneState);
    return (
      <StatRow
        name={`${zone.Name}`}
        value={formatNumber(
          props.rewardProperty(zone.Reward)
        )}
        onClick={() => setActiveZone(zone)}
      />
    );
  } else if (biggestCacheBonus != null) {
    const bonus = (biggestCacheBonus as BonusState)
    return (
      <StatRow
        name={`${bonus.Name} (B)`}
        value={formatNumber(
          props.rewardProperty(bonus.Reward)
        )}
        onClick={() => setActiveBonus(bonus)}
      />
    );
  }
  return <></>;
};
export default BiggestCache;
