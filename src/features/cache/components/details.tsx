import StatRow from "@components/atoms/statrow";
import MaterialDetails from "@features/material/components/details";
import { RewardCache } from "@features/rewardCache/lib/types";
import { formatNumber } from "@helpers/numberHelper";
import { getMultiplier } from "@lib/services/multiplierService";
import { MultiplierType } from "@lib/services/multiplierService/types";
import useLevelStore from "@lib/stores/levelStore";
import usePlayerStore from "@lib/stores/playerStore";

const CacheDetails = (props: { cache: RewardCache }) => {
  const armyCacheMultiplier =
    getMultiplier(
      MultiplierType.CacheArmies,
      usePlayerStore((state) => state.Advancements),
      usePlayerStore((state) => state.Artifacts),
      useLevelStore((state) => state.Techs)
    ) +
    getMultiplier(
      MultiplierType.Cache,
      usePlayerStore((state) => state.Advancements),
      usePlayerStore((state) => state.Artifacts),
      useLevelStore((state) => state.Techs)
    ) -
    1;
  const moneyCacheMultiplier =
    getMultiplier(
      MultiplierType.CacheMoney,
      usePlayerStore((state) => state.Advancements),
      usePlayerStore((state) => state.Artifacts),
      useLevelStore((state) => state.Techs)
    ) +
    getMultiplier(
      MultiplierType.Cache,
      usePlayerStore((state) => state.Advancements),
      usePlayerStore((state) => state.Artifacts),
      useLevelStore((state) => state.Techs)
    ) -
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
      <MaterialDetails materials={props.cache.Materials} />
    </>
  );
};
export default CacheDetails;