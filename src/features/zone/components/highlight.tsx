import Card from "@components/atoms/card";
import StatRow from "@components/atoms/statrow";
import Text from "@components/atoms/text";
import BonusLink from "@features/bonus/components/link";
import { hospitalSaveForZone } from "@features/hospital/lib/helper";
import RewardDetails from "@features/reward/components/details";
import { formatNumber } from "@helpers/numberHelper";
import { getCheapestPath } from "@lib/services/pathService";
import useLevelStore from "@lib/stores/levelStore";
import usePlayerStore from "@lib/stores/playerStore";
import { getMultiplier } from "@lib/services/multiplierService";
import { MultiplierType } from "@lib/services/multiplierService/types";
import { ZoneState } from "../lib/types";
import Button from "@components/atoms/button";

const ZoneHighlight = (props: { zone: ZoneState }) => {
  const allZones = useLevelStore((state) => state.Zones);
  const setPath = useLevelStore((state) => state.SetActivePath);
  const hospitalMap = useLevelStore((state) => state.Hospitals);
  const hospitals = Array.from(hospitalMap.values());
  const advancements = usePlayerStore((state) => state.Advancements);
  const artifacts = usePlayerStore((state) => state.Artifacts);
  const techs = useLevelStore((state) => state.Techs);
  if (!props.zone || allZones == undefined) return <></>;
  const conqueredHospitals = hospitals.filter(
    (h) => allZones.get(h.Zone).Conquered
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
  let cost = props.zone.Cost;
  let zoneHospitalSaves = 0;
  conqueredHospitals.forEach(
    (h) =>
      (zoneHospitalSaves +=
				hospitalSaveForZone(h, props.zone) * hospitalMultiplier)
  );
  cost -= zoneHospitalSaves;
  cost = Math.max(cost, 0);
  if (
    props.zone.ConnectedZones.filter((z) => allZones.get(z).Conquered).length >
		1
  )
    cost *= jointStrikeMultiplier;

  return (
    <Card>
      <Card.Header>{props.zone.Name}</Card.Header>
      <Card.Body>
        <StatRow
          name="Cost"
          value={formatNumber(props.zone.Cost)}
          percentage={formatNumber(cost)}
        />
        <Button
          onClick={() =>
            setPath(
              getCheapestPath(
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
        <RewardDetails reward={props.zone.Reward} />

        <Text>Bonuses</Text>
        {props.zone.Bonuses.map((b) => (
          <BonusLink key={b.Id} bonus={b} />
        ))}
      </Card.Body>
    </Card>
  );
};
export default ZoneHighlight;
