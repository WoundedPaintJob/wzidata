import Card from "@components/atoms/card";
import { Arena } from "../lib/types";
import MaterialDetails from "@features/material/components/details";
import AssetHeader from "@components/assetHeader";
import StatRow from "@components/atoms/statrow";
import { formatNumber } from "@helpers/numberHelper";
import Text from "@components/atoms/text";
import usePlayerStore from "@lib/stores/playerStore";
import useLevelStore from "@lib/stores/levelStore";
import { getMultiplier } from "@lib/services/multiplierService";
import { MultiplierType } from "@lib/services/multiplierService/types";

const Arena = (props: { arena: Arena }) => {
  const advancements = usePlayerStore((state) => state.Advancements);
  const artifacts = usePlayerStore((state) => state.Artifacts);
  const techs = useLevelStore((state) => state.Techs);
  const cacheMultiplier = getMultiplier(
    MultiplierType.Cache,
    advancements,
    artifacts,
    techs
  );
  const moneyCacheMultiplier = getMultiplier(
    MultiplierType.CacheMoney,
    advancements,
    artifacts,
    techs
  );
  const armyCacheMultiplier = getMultiplier(
    MultiplierType.CacheArmies,
    advancements,
    artifacts,
    techs
  );
  const resourceCacheMultiplier = getMultiplier(
    MultiplierType.CacheResources,
    advancements,
    artifacts,
    techs
  );
  return (
    <Card>
      <AssetHeader asset={props.arena} />
      <Text size="small">{props.arena.Template.Name}</Text>
      {props.arena.Reward.Armies && (
        <StatRow
          name="Armies"
          value={formatNumber(
            props.arena.Reward.Armies *
							(cacheMultiplier + armyCacheMultiplier - 1)
          )}
        />
      )}
      {props.arena.Reward.Money && (
        <StatRow
          name="Money"
          value={formatNumber(
            props.arena.Reward.Money *
							(cacheMultiplier + moneyCacheMultiplier - 1)
          )}
        />
      )}
      <MaterialDetails
        materials={props.arena.Reward.Materials}
        roundNumber="rounded"
        multiplier={cacheMultiplier + resourceCacheMultiplier - 1}
      />
    </Card>
  );
};
export default Arena;
