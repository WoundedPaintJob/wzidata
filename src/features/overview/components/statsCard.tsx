import Card from "@components/atoms/card";
import StatRow from "@components/atoms/statrow";
import { getTotalArmyCampProduction } from "@features/armyCamp/lib/helper";
import { calculateMoneyCache } from "@features/cache/lib/helper";
import { formatNumber } from "@helpers/numberHelper";
import { MultiplierType } from "@lib/services/multiplierService/types";
import useArmyCamps from "@lib/state/hooks/assets/useArmyCamps";
import useBonusMap from "@lib/state/hooks/useBonusMap";
import useMultiplier from "@lib/state/hooks/useMultiplier";
import useZoneMap from "@lib/state/hooks/useZoneMap";
import useLevelStore from "@lib/stores/levelStore";

const StatsCard = () => {
  const armyCampMap = useArmyCamps(true);
  const zoneMap = useZoneMap(true);
  const bonusMap = useBonusMap(true);
  const armyCamps = Array.from(armyCampMap.values());
  const superCampMultiplier = 1.1;
  const campProductionMultiplier = useMultiplier(
    MultiplierType.ArmyCampProduction
  );
  const armyCacheMultiplier = useMultiplier(MultiplierType.CacheArmies);
  const moneyCacheMultiplier = useMultiplier(MultiplierType.CacheMoney);
  const cacheMultiplier = useMultiplier(MultiplierType.Cache);
  const draftMultiplier = useMultiplier(MultiplierType.DraftSize);
  const revision = useLevelStore((state) => state.LevelRevision) || 0;
  const superCamp = useLevelStore((state) => state.SuperCamp);
  const totalArmyProduction = getTotalArmyCampProduction(
    armyCamps,
    superCamp,
    1,
    revision,
    superCampMultiplier
  );
  const armyCache =
    totalArmyProduction *
    (campProductionMultiplier + armyCacheMultiplier + cacheMultiplier - 2);
  const moneyCache = calculateMoneyCache(
    zoneMap,
    bonusMap,
    moneyCacheMultiplier + cacheMultiplier - 1
  );
  const draftSize =
    totalArmyProduction * (campProductionMultiplier + draftMultiplier - 1);
  return (
    <Card>
      <Card.Header>Stats</Card.Header>
      <Card.Body>
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
      </Card.Body>
    </Card>
  );
};
export default StatsCard;
