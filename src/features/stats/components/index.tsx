import Section from "@components/atoms/section";
import StatRow from "@components/atoms/statrow";
import { formatNumber } from "@helpers/numberHelper";
import { calculateMoneyCache } from "../lib/helper";
import usePlayerStore from "@lib/stores/playerStore";
import useLevelStore from "@lib/stores/levelStore";
import { getMultiplier } from "@lib/services/multiplierService";
import { MultiplierType } from "@lib/services/multiplierService/types";
import { getTotalArmyCampProduction } from "@features/armyCamp/lib/helper";

const StatsTab = () => {
  const armyCamps = Array.from(
    useLevelStore((state) => state.ArmyCamps).values()
  );
  const zones = useLevelStore((state) => state.Zones);
  const bonuses = useLevelStore((state) => state.Bonuses);
  const advancements = usePlayerStore((state) => state.Advancements);
  const artifacts = usePlayerStore((state) => state.Artifacts);
  const techs = useLevelStore((state) => state.Techs);
  const revision = useLevelStore((state) => state.LevelRevision) || 0;
  const superCamp = useLevelStore((state) => state.SuperCamp);
  const superCampMultiplier = 1.1;
  const campProductionMultiplier = getMultiplier(
    MultiplierType.ArmyCampProduction,
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
  const moneyCacheMultiplier = getMultiplier(
    MultiplierType.CacheMoney,
    advancements,
    artifacts,
    techs
  );
  const cacheMultiplier = getMultiplier(
    MultiplierType.Cache,
    advancements,
    artifacts,
    techs
  );
  const draftMultiplier = getMultiplier(
    MultiplierType.DraftSize,
    advancements,
    artifacts,
    techs
  );
  const totalArmyProduction = getTotalArmyCampProduction(
    armyCamps,
    superCamp,
    zones,
    bonuses,
    1,
    revision,
    superCampMultiplier
  );
  const armyCache =
    totalArmyProduction *
    (campProductionMultiplier + armyCacheMultiplier + cacheMultiplier - 2);
  const moneyCache = calculateMoneyCache(zones, bonuses, moneyCacheMultiplier);
  const draftSize =
    totalArmyProduction * (campProductionMultiplier + draftMultiplier - 1);
  return (
    <Section>
      <StatRow
        name="Army cache"
        value={`${formatNumber(
          totalArmyProduction * 1800 * 0.7
        )}-${formatNumber(totalArmyProduction * 1800 * 1.3)}`}
      />
      <StatRow
        name="Money cache"
        value={`${formatNumber(moneyCache * 1800 * 0.7)}-${formatNumber(
          moneyCache * 1800 * 1.3
        )}`}
      />
      <StatRow
        name="Draft armies"
        value={`${formatNumber(draftSize * 90)}-${formatNumber(
          draftSize * 60 * 60
        )}`}
      />
      <StatRow
        name="Clan Request"
        value={`${formatNumber(
          totalArmyProduction * 5400 * 0.7
        )}-${formatNumber(armyCache * 5400 * 1.3)}`}
      />
    </Section>
  );
};
export default StatsTab;
