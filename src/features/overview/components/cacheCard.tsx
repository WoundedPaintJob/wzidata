import Card from "@components/atoms/card";
import StatRow from "@components/atoms/statrow";
import { formatNumber, formatPercentage } from "@helpers/numberHelper";
import { CacheCardProps } from "../lib/types";
import BestCache from "./bestCache";
import BiggestCache from "./biggestCache";

const CacheCard = (props: CacheCardProps) => {
  let totalCache = 0;
  let remainingCache = 0;
  props.zones
    .filter((z) => z.Reward && props.rewardProperty(z.Reward) > 0)
    .forEach((zone) => {
      totalCache += props.rewardProperty(zone.Reward);
      if (!zone.Conquered) remainingCache += props.rewardProperty(zone.Reward);
    });
  props.bonuses
    .filter((b) => b.Reward.Cache && props.rewardProperty(b.Reward) > 0)
    .forEach((bonus) => {
      totalCache += props.rewardProperty(bonus.Reward) * props.cacheMultiplier;
      if (!bonus.Conquered)
        remainingCache +=
          props.rewardProperty(bonus.Reward) * props.cacheMultiplier;
    });
  const remainingCacheZones = props.zones.filter(
    (zone) =>
      !zone.Conquered && zone.Reward && props.rewardProperty(zone.Reward) > 0
  );
  const remainingCacheBonuses = props.bonuses.filter(
    (bonus) =>
      !bonus.Conquered && bonus.Reward && props.rewardProperty(bonus.Reward) > 0
  );
  return (
    <Card>
      <Card.SmallHeader>{props.header}</Card.SmallHeader>
      <Card.Body>
        <StatRow
          name="Total"
          value={formatNumber(totalCache)}
          percentage={
            props.totalArmies
              ? formatPercentage(totalCache / props.totalArmies)
              : ""
          }
        />
        <StatRow
          name="Remaining"
          value={formatNumber(remainingCache)}
          percentage={formatPercentage(remainingCache / totalCache)}
        />
        <BiggestCache
          rewardProperty={props.rewardProperty}
          cacheZones={remainingCacheZones}
          cacheBonuses={remainingCacheBonuses}
          cacheMultiplier={props.cacheMultiplier}
        />
        <BestCache
          rewardProperty={props.rewardProperty}
          cacheZones={remainingCacheZones}
          cacheBonuses={remainingCacheBonuses}
          cacheMultiplier={props.cacheMultiplier}
          hospitalMultiplier={props.hospitalMultiplier}
          jointStrikeMultiplier={props.jointStrikeMultiplier}
          conqueredHospitals={props.conqueredHospitals}
          zones={props.zones}
        />
      </Card.Body>
    </Card>
  );
};
export default CacheCard;
