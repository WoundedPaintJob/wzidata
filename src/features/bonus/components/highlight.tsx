import Card from "@components/atoms/card";
import CheckBox from "@components/atoms/checkbox";
import RewardDetails from "@features/reward/components/details";
import useLevelStore from "@lib/stores/levelStore";
import { BonusState } from "../lib/types";
import { MultiplierType } from "@lib/services/multiplierService/types";
import { totalCostForZone } from "@features/hospital/lib/helper";
import StatRow from "@components/atoms/statrow";
import { formatNumber } from "@helpers/numberHelper";
import useBonus from "@lib/state/hooks/useBonus";
import useHospitals from "@lib/state/hooks/assets/useHospitals";
import { ConquerState } from "@lib/state/hooks/assets/enums";
import useMultiplier from "@lib/state/hooks/useMultiplier";
import { useControls } from "react-zoom-pan-pinch";
import Button from "@components/atoms/button";

const BonusHighlight = (props: { bonus: BonusState }) => {
  const bonus = useBonus(props.bonus.Id);
  const toggleConquered = useLevelStore((state) => state.ConquerBonus);
  const zoneMap = useLevelStore((state) => state.Zones);
  const zones = Array.from(zoneMap.values());
  const hospitals = useHospitals(ConquerState.OnlyConquered);
  const remainingBonusZones = zones.filter(
    (z) => !z.Conquered && props.bonus.ZoneIds.includes(z.Id)
  );

  const { zoomToElement, instance } = useControls();
  const jointStrikeMultiplier = useMultiplier(MultiplierType.JointStrike);
  const hospitalSaveMultiplier = useMultiplier(MultiplierType.HospitalEffect);
  let cost = 0;
  remainingBonusZones.forEach((zone) => {
    cost += totalCostForZone(
      zone,
      hospitals,
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
        <Button
          onClick={() => {
            zoomToElement(`B${bonus.Id}C`, instance.transformState.scale);
          }}
        >
          Focus
        </Button>
        <StatRow name="Cost" value={formatNumber(cost)} />
        <RewardDetails reward={bonus.Reward} />
      </Card.Body>
    </Card>
  );
};
export default BonusHighlight;
