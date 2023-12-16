import StatRow from "@components/atoms/statrow";
import MaterialDetails from "@features/material/components/details";
import { RewardCache } from "@features/rewardCache/lib/types";
import { formatNumber } from "@helpers/numberHelper";
import { MultiplierType } from "@lib/services/multiplierService/types";
import useMultiplier from "@lib/state/hooks/useMultiplier";

const CacheDetails = (props: { cache: RewardCache }) => {
  const armyCacheMultiplier =
    useMultiplier(MultiplierType.CacheArmies) +
    useMultiplier(MultiplierType.Cache) -
    1;
  const moneyCacheMultiplier =
    useMultiplier(MultiplierType.CacheMoney) +
    useMultiplier(MultiplierType.Cache) -
    1;
  const resourceCacheMultiplier =
    useMultiplier(MultiplierType.CacheResources) +
    useMultiplier(MultiplierType.Cache) -
    1;
  return (
    <>
      {props.cache.Money > 0 && (
        <StatRow
          name="Money"
          value={formatNumber(props.cache.Money * moneyCacheMultiplier)}
        />
      )}
      {props.cache.Armies > 0 && (
        <StatRow
          name="Armies"
          value={formatNumber(props.cache.Armies * armyCacheMultiplier)}
        />
      )}
      <MaterialDetails
        materials={props.cache.Materials}
        multiplier={resourceCacheMultiplier}
      />
    </>
  );
};
export default CacheDetails;
