import { ZoneState } from "@features/zone/lib/types";
import { BiggestCacheProps } from "../lib/types";
import { BonusState } from "@features/bonus/lib/types";
import useLevelStore from "@lib/stores/levelStore";
import StatRow from "@components/atoms/statrow";
import { formatNumber } from "@helpers/numberHelper";

const BiggestCache = (props: BiggestCacheProps) => {
  const setActiveZone = useLevelStore((state) => state.SetActiveZone);
  const setActiveBonus = useLevelStore((state) => state.SetActiveBonus);
  let biggestCacheZone: ZoneState = null;
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
  let biggestCacheBonus: BonusState = null;
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
    props.rewardProperty(biggestCacheBonus.Reward) >
      props.rewardProperty(biggestCacheZone.Reward)
  ) {
    return (
      <StatRow
        name={`${biggestCacheBonus.Name} (B)`}
        value={formatNumber(
          props.rewardProperty(biggestCacheBonus.Reward) * props.cacheMultiplier
        )}
        onClick={() => setActiveBonus(biggestCacheBonus)}
      />
    );
  } else if (biggestCacheZone != null) {
    return (
      <StatRow
        name={`${biggestCacheZone.Name}`}
        value={formatNumber(
          props.rewardProperty(biggestCacheZone.Reward) * props.cacheMultiplier
        )}
        onClick={() => setActiveZone(biggestCacheZone)}
      />
    );
  } else if (biggestCacheBonus != null) {
    return (
      <StatRow
        name={`${biggestCacheBonus.Name} (B)`}
        value={formatNumber(
          props.rewardProperty(biggestCacheBonus.Reward) * props.cacheMultiplier
        )}
        onClick={() => setActiveBonus(biggestCacheBonus)}
      />
    );
  }
  return <></>;
};
export default BiggestCache;
