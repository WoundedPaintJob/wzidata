import Card from "@components/atoms/card";
import StatRow from "@components/atoms/statrow";
import { RewardType } from "@features/reward/lib/enums";
import { formatNumber, formatPercentage } from "@helpers/numberHelper";
import useLevelStore from "@lib/stores/levelStore";
import usePlayerStore from "@lib/stores/playerStore";
import { CardData } from "../lib/types";
import { MultiplierType } from "@lib/services/multiplierService/types";
import { getMultiplier } from "@lib/services/multiplierService";
import { totalCostForZone } from "@features/hospital/lib/helper";
import { BonusState } from "@features/bonus/lib/types";
import { ZoneState } from "@features/zone/lib/types";
import { getBiggestCache } from "../lib/helper";
import { Reward } from "@features/reward/lib/types";

const ArmyCacheCard = (props: { data: CardData }) => {
  const setActiveZone = useLevelStore((state) => state.SetActiveZone);
  const setActiveBonus = useLevelStore((state) => state.SetActiveBonus);
  const advancements = usePlayerStore((state) => state.Advancements);
  const artifacts = usePlayerStore((state) => state.Artifacts);
  const techs = useLevelStore((state) => state.Techs);
  const cacheMultiplier =
    getMultiplier(MultiplierType.CacheArmies, advancements, artifacts, techs) +
    getMultiplier(MultiplierType.Cache, advancements, artifacts, techs) -
    1;
  const hospitalSaveMultiplier = getMultiplier(
    MultiplierType.HospitalEffect,
    advancements,
    artifacts,
    techs
  );
  const jointStrikeMultiplier = getMultiplier(
    MultiplierType.JointStrike,
    advancements,
    artifacts,
    techs
  );
  const totalArmyCache =
    props.data.zones
      .map((z) => (z.Reward.Cache ? z.Reward.Cache.Armies : 0))
      .reduce((a, b) => a + b * cacheMultiplier, 0) +
    props.data.bonuses
      .map((b) => (b.Reward.Cache ? b.Reward.Cache.Armies : 0))
      .reduce((a, b) => a + b * cacheMultiplier, 0);

  const remainingArmyZones = props.data.unconqueredZones.filter(
    (z) => z.Reward.Type == RewardType.ArmyCache
  );
  const remainingArmyBonuses = props.data.unconqueredBonuses.filter(
    (b) => b.Reward.Type == RewardType.ArmyCache
  );
  const remainingArmyCache =
    remainingArmyZones
      .map((z) => z.Reward.Cache.Armies)
      .reduce((a, b) => a + b * cacheMultiplier, 0) +
    remainingArmyBonuses
      .map((b) => b.Reward.Cache.Armies)
      .reduce((a, b) => a + b * cacheMultiplier, 0);
  const totalArmies = props.data.zones
    .map((z) => z.Cost)
    .reduce((a, b) => a + b);
  function bigComparer(reward1: Reward, reward2: Reward) {
    return reward1.Cache.Armies > reward2.Cache.Armies;
  }
  const test = getBiggestCache(bigComparer, remainingArmyZones, remainingArmyBonuses);
  let biggestCacheZone: ZoneState = null;
  let bestCacheZone: ZoneState = null;
  let bestCacheZoneCost = 1e100;
  if (remainingArmyZones.length > 0) {
    remainingArmyZones.forEach((z) => {
      if (
        biggestCacheZone == null ||
        z.Reward.Cache.Armies > biggestCacheZone.Reward.Cache.Armies
      )
        biggestCacheZone = z;
      const cost = totalCostForZone(
        z,
        props.data.ConqueredHospitals,
        hospitalSaveMultiplier,
        jointStrikeMultiplier,
        props.data.unconqueredZones.filter((iz) =>
          z.ConnectedZones.includes(iz.Id)
        ).length > 1
      );
      if (bestCacheZone == null) {
        bestCacheZoneCost = cost;
        bestCacheZone = z;
      }
      if (cost == 0) {
        if (bestCacheZoneCost == 0) {
          if (z.Reward.Cache.Armies > bestCacheZone.Reward.Cache.Armies) {
            bestCacheZoneCost = cost;
            bestCacheZone = z;
          }
        } else {
          bestCacheZoneCost = cost;
          bestCacheZone = z;
        }
      } else if (
        z.Reward.Cache.Armies / cost >
        bestCacheZone.Reward.Cache.Armies / bestCacheZoneCost
      ) {
        bestCacheZoneCost = cost;
        bestCacheZone = z;
      }
    });
  }
  let biggestCacheBonus: BonusState = null;
  let bestCacheBonus: BonusState = null;
  let bestCacheBonusCost = 1e100;
  if (remainingArmyBonuses.length > 0) {
    remainingArmyBonuses.forEach((b) => {
      if (
        biggestCacheBonus == null ||
        b.Reward.Cache.Armies > biggestCacheBonus.Reward.Cache.Armies
      )
        biggestCacheBonus = b;
      let totalCostForBonus = 0;
      const zonesInBonus = props.data.unconqueredZones.filter((z) =>
        z.Bonuses.includes(b)
      );
      zonesInBonus.forEach((zone) => {
        totalCostForBonus += totalCostForZone(
          zone,
          props.data.ConqueredHospitals,
          hospitalSaveMultiplier,
          jointStrikeMultiplier,
          props.data.unconqueredZones.filter((iz) =>
            zone.ConnectedZones.includes(iz.Id)
          ).length > 1
        );
      });
      if (bestCacheBonus == null) {
        bestCacheBonusCost = totalCostForBonus;
        bestCacheBonus = b;
      } else if (totalCostForBonus == 0) {
        if (bestCacheBonusCost == 0) {
          if (b.Reward.Cache.Armies > bestCacheBonus.Reward.Cache.Armies) {
            bestCacheBonusCost = totalCostForBonus;
            bestCacheBonus = b;
          }
        } else {
          bestCacheBonusCost = totalCostForBonus;
          bestCacheBonus = b;
        }
      } else if (
        b.Reward.Cache.Armies / totalCostForBonus >
        bestCacheBonus.Reward.Cache.Armies / bestCacheBonusCost
      ) {
        bestCacheBonusCost = totalCostForBonus;
        bestCacheBonus = b;
      }
    });
  }
  let biggestLink = <></>;
  if (
    (biggestCacheZone != null &&
      biggestCacheBonus != null &&
      biggestCacheBonus.Reward.Cache.Armies >
      biggestCacheZone.Reward.Cache.Armies) ||
    biggestCacheBonus != null
  )
    biggestLink = (
      <StatRow
        name={`${biggestCacheBonus.Name} (B)`}
        value={formatNumber(
          biggestCacheBonus.Reward.Cache.Armies * cacheMultiplier
        )}
        onClick={() => setActiveBonus(biggestCacheBonus)}
        percentage="Best"
      />
    );
  else if (biggestCacheZone != null)
    biggestLink = (
      <StatRow
        name={biggestCacheZone.Name}
        value={formatNumber(
          biggestCacheZone.Reward.Cache.Armies * cacheMultiplier
        )}
        onClick={() => setActiveZone(biggestCacheZone)}
        percentage="Best"
      />
    );
  let bestLink = <></>;
  if (
    (bestCacheZone != null &&
      bestCacheBonus != null &&
      bestCacheBonus.Reward.Cache.Armies > bestCacheZone.Reward.Cache.Armies) ||
    bestCacheBonus != null
  )
    bestLink = (
      <StatRow
        name={`${bestCacheBonus.Name} (B)`}
        value={formatNumber(
          bestCacheBonus.Reward.Cache.Armies * cacheMultiplier
        )}
        onClick={() => setActiveBonus(bestCacheBonus)}
        percentage="Best A/A"
      />
    );
  else if (bestCacheZone != null)
    bestLink = (
      <StatRow
        name={bestCacheZone.Name}
        value={formatNumber(
          bestCacheZone.Reward.Cache.Armies * cacheMultiplier
        )}
        onClick={() => setActiveZone(bestCacheZone)}
        percentage="Best A/A"
      />
    );
  return (
    <Card>
      <Card.SmallHeader>Army Caches</Card.SmallHeader>
      <Card.Body>
        <StatRow
          name="Total"
          value={formatNumber(totalArmyCache)}
          percentage={formatPercentage(totalArmyCache / totalArmies)}
        />
        <StatRow
          name="Remaining"
          value={formatNumber(remainingArmyCache)}
          percentage={formatPercentage(remainingArmyCache / totalArmyCache)}
        />
        {biggestLink}
        {bestLink}
      </Card.Body>
    </Card>
  );
};
export default ArmyCacheCard;
