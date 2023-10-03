import Card from "@components/atoms/card";
import StatRow from "@components/atoms/statrow";
import Text from "@components/atoms/text";
import BonusLink from "@features/bonus/components/link";
import {
  totalCostForZone,
} from "@features/hospital/lib/helper";
import RewardDetails from "@features/reward/components/details";
import { formatNumber } from "@helpers/numberHelper";
import { reversePath } from "@lib/services/pathService";
import useLevelStore from "@lib/stores/levelStore";
import usePlayerStore from "@lib/stores/playerStore";
import { getMultiplier } from "@lib/services/multiplierService";
import { MultiplierType } from "@lib/services/multiplierService/types";
import { ZoneState } from "../lib/types";
import Button from "@components/atoms/button";
import { useControls } from "react-zoom-pan-pinch";

const ZoneHighlight = (props: { zone: ZoneState }) => {
  const allZones = useLevelStore((state) => state.Zones);
  const setPath = useLevelStore((state) => state.SetActivePath);
  const hospitalMap = useLevelStore((state) => state.Hospitals);
  const hospitals = Array.from(hospitalMap.values());
  const advancements = usePlayerStore((state) => state.Advancements);
  const artifacts = usePlayerStore((state) => state.Artifacts);
  const techs = useLevelStore((state) => state.Techs);
  const { zoomToElement, instance } = useControls();
  if (!props.zone || allZones == undefined) return <></>;
  const conqueredHospitals = hospitals.filter((h) =>
    h.Zone ? allZones.get(h.Zone)?.Conquered : false
  );

  const hospitalMultiplier = getMultiplier(
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
  const cost = totalCostForZone(
    props.zone,
    conqueredHospitals,
    hospitalMultiplier,
    jointStrikeMultiplier,
    props.zone.ConnectedZones.filter((z) => allZones.get(z)?.Conquered).length >
    1
  );
  return (
    <Card>
      <Card.Header>{props.zone.Name}</Card.Header>
      <Card.Body>
        <StatRow
          name="Cost"
          value={formatNumber(props.zone.Cost)}
          percentage={formatNumber(cost)}
        />
        <div className="flex space-x-1">
          <Button
            onClick={() =>
              setPath(
                reversePath(
                  props.zone,
                  allZones,
                  hospitalMultiplier,
                  jointStrikeMultiplier,
                  conqueredHospitals
                )
              )
            }
          >
            Find Path
          </Button>
          <Button onClick={() => {
            zoomToElement(`Z${props.zone.Id}G`, instance.transformState.scale);
          }}>
            Focus
          </Button>
        </div>
        <RewardDetails reward={props.zone.Reward} />

        <Text>Bonuses</Text>
        {props.zone.Bonuses.slice()
          .sort((a, b) => a.ZoneIds.length - b.ZoneIds.length)
          .map((b) => (
            <BonusLink key={b.Id} bonus={b} />
          ))}
      </Card.Body>
    </Card >
  );
};
export default ZoneHighlight;
