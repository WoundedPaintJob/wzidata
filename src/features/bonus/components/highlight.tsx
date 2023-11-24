import Card from "@components/atoms/card";
import CheckBox from "@components/atoms/checkbox";
import RewardDetails from "@features/reward/components/details";
import useLevelStore from "@lib/stores/levelStore";
import { BonusState } from "../lib/types";
import usePlayerStore from "@lib/stores/playerStore";
import { getMultiplier } from "@lib/services/multiplierService";
import { MultiplierType } from "@lib/services/multiplierService/types";
import { totalCostForZone } from "@features/hospital/lib/helper";
import { isAssetConquered } from "@helpers/assetHelper";
import StatRow from "@components/atoms/statrow";
import { formatNumber } from "@helpers/numberHelper";
import useBonus from "@lib/state/hooks/useBonus";

const BonusHighlight = (props: { bonus: BonusState }) => {
  const bonus = useBonus(props.bonus.Id);
  const toggleConquered = useLevelStore((state) => state.ConquerBonus);
  const zoneMap = useLevelStore((state) => state.Zones);
  const bonusMap = useLevelStore((state) => state.Bonuses);
  const zones = Array.from(zoneMap.values());
  const advancements = usePlayerStore((state) => state.Advancements);
  const artifacts = usePlayerStore((state) => state.Artifacts);
  const techs = useLevelStore((state) => state.Techs);
  const hospitals = Array.from(
    useLevelStore((state) => state.Hospitals).values()
  );
  const conqueredHospitals = hospitals.filter((h) =>
    isAssetConquered(h, zoneMap, bonusMap)
  );
  const remainingBonusZones = zones.filter(
    (z) => !z.Conquered && props.bonus.ZoneIds.includes(z.Id)
  );

  const jointStrikeMultiplier = getMultiplier(
    MultiplierType.JointStrike,
    advancements,
    artifacts,
    techs
  );
  const hospitalSaveMultiplier = getMultiplier(
    MultiplierType.HospitalEffect,
    advancements,
    artifacts,
    techs
  );
  let cost = 0;
  remainingBonusZones.forEach((zone) => {
    cost += totalCostForZone(
      zone,
      conqueredHospitals,
      hospitalSaveMultiplier,
      jointStrikeMultiplier,
      zone.ConnectedZones.length > 1
    );
  });
  if (!bonus) return <>No Bonus</>;
  return (
    <Card>
      <Card.Header>
        <div className="flex space-x-2 items-baseline">
          <span>{bonus.Name}</span>
          <CheckBox
            checked={bonus.Conquered || false}
            onClick={() => toggleConquered(bonus)}
          />
        </div>
      </Card.Header>
      <Card.Body>
        <StatRow name="Cost" value={formatNumber(cost)} />
        <RewardDetails reward={bonus.Reward} />
      </Card.Body>
    </Card>
  );
};
export default BonusHighlight;
