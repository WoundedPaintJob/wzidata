import useLevelStore from "@lib/stores/levelStore";
import { CacheCardProps, CardData } from "../lib/types";
import { MultiplierType } from "@lib/services/multiplierService/types";
import { Reward } from "@features/reward/lib/types";
import { MaterialKind } from "@features/material/lib/enums";
import CacheCard from "./cacheCard";
import useMultiplier from "@lib/state/hooks/useMultiplier";

const ResourceCacheCard = (props: CardData) => {
  const materials = useLevelStore((state) => state.Materials);
  const cacheMultiplier =
    useMultiplier(MultiplierType.CacheResources) +
    useMultiplier(MultiplierType.Cache) -
    1;
  const hospitalSaveMultiplier = useMultiplier(MultiplierType.HospitalEffect);
  const jointStrikeMultiplier = useMultiplier(MultiplierType.JointStrike);
  const oreMultiplier = useMultiplier(MultiplierType.SellOre);
  const alloyMultiplier = useMultiplier(MultiplierType.SellAlloy);
  const itemMultiplier = useMultiplier(MultiplierType.SellItem);
  function rewardProperty(reward: Reward) {
    if (!reward.Cache || reward.Cache.Materials.length == 0) return 0;
    let totalReward = 0;
    reward.Cache.Materials.forEach((mat) => {
      const stateMat = materials.get(mat.Type);
      if (stateMat) {
        if (mat.Kind == MaterialKind.Ore) {
          totalReward +=
            mat.Amount * cacheMultiplier * stateMat.Cost * oreMultiplier;
        }
        if (mat.Kind == MaterialKind.Alloy) {
          totalReward +=
            mat.Amount * cacheMultiplier * stateMat.Cost * alloyMultiplier;
        }
        if (mat.Kind == MaterialKind.Item) {
          totalReward +=
            mat.Amount * cacheMultiplier * stateMat.Cost * itemMultiplier;
        }
      }
    });
    return totalReward;
  }
  const cardProps: CacheCardProps = {
    bonuses: props.bonuses,
    cacheMultiplier: cacheMultiplier,
    conqueredHospitals: props.conqueredHospitals,
    header: "Resource cache",
    hospitalMultiplier: hospitalSaveMultiplier,
    jointStrikeMultiplier: jointStrikeMultiplier,
    rewardProperty: rewardProperty,
    zones: props.zones,
  };
  return <CacheCard {...cardProps} />;
};
export default ResourceCacheCard;
