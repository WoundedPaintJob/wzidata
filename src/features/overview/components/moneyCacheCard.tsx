import Card from "@components/atoms/card";
import StatRow from "@components/atoms/statrow";
import { formatNumber, formatPercentage } from "@helpers/numberHelper";
import useLevelStore from "@lib/stores/levelStore";
import usePlayerStore from "@lib/stores/playerStore";
import { CardData } from "../lib/types";
import { getMultiplier } from "@lib/services/multiplierService";
import { MultiplierType } from "@lib/services/multiplierService/types";
import { ZoneState } from "@features/zone/lib/types";
import { BonusState } from "@features/bonus/lib/types";
import {
  totalCostForZone,
} from "@features/hospital/lib/helper";
import { RewardType } from "@features/reward/lib/enums";

const MoneyCacheCard = (props: { data: CardData }) => {
  const setActiveZone = useLevelStore((state) => state.SetActiveZone);
  const setActiveBonus = useLevelStore((state) => state.SetActiveBonus);

  const advancements = usePlayerStore((state) => state.Advancements);
  const artifacts = usePlayerStore((state) => state.Artifacts);
  const techs = useLevelStore((state) => state.Techs);
  const cacheMultiplier =
    getMultiplier(MultiplierType.CacheMoney, advancements, artifacts, techs) +
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
  const totalMoneyCache =
    props.data.zones
      .map((z) => (z.Reward.Cache ? z.Reward.Cache.Money : 0))
      .reduce((a, b) => a + b * cacheMultiplier, 0) +
    props.data.bonuses
      .map((b) => (b.Reward.Cache ? b.Reward.Cache.Money : 0))
      .reduce((a, b) => a + b * cacheMultiplier, 0);

  const remainingMoneyZones = props.data.unconqueredZones.filter(
    (z) => z.Reward.Type == RewardType.MoneyCache
  );
  const remainingMoneyBonuses = props.data.unconqueredBonuses.filter(
    (b) => b.Reward.Type == RewardType.MoneyCache
  );

  const remainingMoneyCache =
    remainingMoneyZones
      .map((z) => z.Reward.Cache.Money)
      .reduce((a, b) => a + b * cacheMultiplier, 0) +
    remainingMoneyBonuses
      .map((b) => b.Reward.Cache.Money)
      .reduce((a, b) => a + b * cacheMultiplier, 0);

  let biggestCacheZone: ZoneState = null;
  let bestCacheZone: ZoneState = null;
  let bestCacheZoneCost = 1e100;
  if (remainingMoneyZones.length > 0) {
    remainingMoneyZones.forEach((z) => {
      if (
        biggestCacheZone == null ||
        z.Reward.Cache.Money > biggestCacheZone.Reward.Cache.Money
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
          if (z.Reward.Cache.Money > bestCacheZone.Reward.Cache.Money) {
            bestCacheZoneCost = cost;
            bestCacheZone = z;
          }
        } else {
          bestCacheZoneCost = cost;
          bestCacheZone = z;
        }
      } else if (
        z.Reward.Cache.Money / cost >
        bestCacheZone.Reward.Cache.Money / bestCacheZoneCost
      ) {
        bestCacheZoneCost = cost;
        bestCacheZone = z;
      }
    });
  }
  let biggestCacheBonus: BonusState = null;
  let bestCacheBonus: BonusState = null;
  let bestCacheBonusCost = 1e100;
  if (remainingMoneyBonuses.length > 0) {
    remainingMoneyBonuses.forEach((b) => {
      if (
        biggestCacheBonus == null ||
        b.Reward.Cache.Money > biggestCacheBonus.Reward.Cache.Money
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
          if (b.Reward.Cache.Money > bestCacheBonus.Reward.Cache.Money) {
            bestCacheBonusCost = totalCostForBonus;
            bestCacheBonus = b;
          }
        } else {
          bestCacheBonusCost = totalCostForBonus;
          bestCacheBonus = b;
        }
      } else if (
        b.Reward.Cache.Money / totalCostForBonus >
        bestCacheBonus.Reward.Cache.Money / bestCacheBonusCost
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
      biggestCacheBonus.Reward.Cache.Money >
      biggestCacheZone.Reward.Cache.Money) ||
    biggestCacheBonus != null
  )
    biggestLink = (
      <StatRow
        name={`${biggestCacheBonus.Name} (B)`}
        value={formatNumber(
          biggestCacheBonus.Reward.Cache.Money * cacheMultiplier
        )}
        percentage="Best $"
        onClick={() => setActiveBonus(biggestCacheBonus)}
      />
    );
  else if (biggestCacheZone != null)
    biggestLink = (
      <StatRow
        name={biggestCacheZone.Name}
        value={formatNumber(
          biggestCacheZone.Reward.Cache.Money * cacheMultiplier
        )}
        onClick={() => setActiveZone(biggestCacheZone)}
        percentage="Best $"
      />
    );
  let bestLink = <></>;
  if (
    (bestCacheZone != null &&
      bestCacheBonus != null &&
      bestCacheBonus.Reward.Cache.Money > bestCacheZone.Reward.Cache.Money) ||
    bestCacheBonus != null
  )
    bestLink = (
      <StatRow
        name={`${bestCacheBonus.Name} (B)`}
        value={formatNumber(
          bestCacheBonus.Reward.Cache.Money * cacheMultiplier
        )}
        onClick={() => setActiveBonus(bestCacheBonus)}
        percentage="Best $/A"
      />
    );
  else if (bestCacheZone != null)
    bestLink = (
      <StatRow
        name={bestCacheZone.Name}
        value={formatNumber(bestCacheZone.Reward.Cache.Money * cacheMultiplier)}
        onClick={() => setActiveZone(bestCacheZone)}
        percentage="Best $/A"
      />
    );
  return (
    <Card>
      <Card.SmallHeader>Money Caches</Card.SmallHeader>
      <Card.Body>
        <StatRow name="Total" value={formatNumber(totalMoneyCache)} />
        <StatRow
          name="Remaining"
          value={formatNumber(remainingMoneyCache)}
          percentage={formatPercentage(remainingMoneyCache / totalMoneyCache)}
        />
        {biggestLink}
        {bestLink}
      </Card.Body>
    </Card>
  );
};
export default MoneyCacheCard;
