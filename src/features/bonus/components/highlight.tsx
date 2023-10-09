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
import Text from "@components/atoms/text";

const BonusHighlight = (props: { bonus: BonusState }) => {
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
  if (!props.bonus) return <>No Bonus</>;
  return (
    <Card>
      <Card.Header>
        <div className="flex space-x-2">
          <span>{props.bonus.Name}</span>
          <div className="sm:hidden">
            <CheckBox
              checked={props.bonus.Conquered || false}
              onClick={() => toggleConquered(props.bonus)}
            />
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <StatRow name="Cost" value={formatNumber(cost)} />
        <RewardDetails reward={props.bonus.Reward} />
      </Card.Body>
    </Card>
  );
};
export default BonusHighlight;
