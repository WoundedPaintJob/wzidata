import Card from "@components/atoms/card";
import StatRow from "@components/atoms/statrow";
import Text from "@components/atoms/text";
import BonusLink from "@features/bonus/components/link";
import { totalCostForZone } from "@features/hospital/lib/helper";
import RewardDetails from "@features/reward/components/details";
import { formatNumber } from "@helpers/numberHelper";
import { reversePath } from "@lib/services/pathService";
import useLevelStore from "@lib/stores/levelStore";
import { MultiplierType } from "@lib/services/multiplierService/types";
import { ZoneState } from "../lib/types";
import Button from "@components/atoms/button";
import { useControls } from "react-zoom-pan-pinch";
import CheckBox from "@components/atoms/checkbox";
import useMultiplier from "@lib/state/hooks/useMultiplier";
import useZone from "@lib/state/hooks/useZone";
import useZoneMap from "@lib/state/hooks/useZoneMap";
import useHospitals from "@lib/state/hooks/assets/useHospitals";

const ZoneHighlight = (props: { zone: ZoneState }) => {
  const zone = useZone(props.zone.Id);
  const toggleConquered = useLevelStore((state) => state.ConquerZone);
  const allZones = useZoneMap(true);
  const setPath = useLevelStore((state) => state.SetActivePath);
  const hospitalMap = useHospitals(true);
  const hospitals = Array.from(hospitalMap.values());
  const { zoomToElement, instance } = useControls();
  if (!zone || allZones == undefined) return <></>;

  const hospitalMultiplier = useMultiplier(MultiplierType.HospitalEffect);
  const jointStrikeMultiplier = useMultiplier(MultiplierType.JointStrike);
  const cost = totalCostForZone(
    zone,
    hospitals,
    hospitalMultiplier,
    jointStrikeMultiplier,
    zone.ConnectedZones.filter((z) => allZones.get(z)?.Conquered).length > 1
  );
  return (
    <Card>
      <Card.Header>
        <div className="flex space-x-2 items-baseline">
          <span>{zone.Name}</span>
          <div className="sm:hidden">
            <CheckBox
              checked={zone.Conquered || false}
              onClick={() => toggleConquered(zone)}
            />
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <StatRow
          name="Cost"
          value={formatNumber(zone.Cost)}
          percentage={formatNumber(cost)}
        />
        <div className="flex space-x-1">
          <Button
            onClick={() =>
              setPath(
                reversePath(
                  zone,
                  allZones,
                  hospitalMultiplier,
                  jointStrikeMultiplier,
                  hospitals
                )
              )
            }
          >
            Find Path
          </Button>
          <Button
            onClick={() => {
              zoomToElement(
                `Z${zone.Id}G`,
                instance.transformState.scale
              );
            }}
          >
            Focus
          </Button>
        </div>
        <RewardDetails reward={zone.Reward} />

        <Text>Bonuses</Text>
        {zone.Bonuses.slice()
          .sort((a, b) => a.ZoneIds.length - b.ZoneIds.length)
          .map((b) => (
            <BonusLink key={b.Id} bonus={b} />
          ))}
      </Card.Body>
    </Card>
  );
};
export default ZoneHighlight;
