import Card from "@components/atoms/card";
import StatRow from "@components/atoms/statrow";
import { formatNumber } from "@helpers/numberHelper";
import useLevelStore from "@lib/stores/levelStore";
import { MapPath } from "../lib/types";
import Button from "@components/atoms/button";

const PathHighlight = (props: { path: MapPath }) => {
  if (props.path.Zones.length == 0) return <></>;
  const conquerZones = useLevelStore((state) => state.ConquerZones);
  let mostExpensive = props.path.Zones[0];
  props.path.Zones.forEach((zone) => { if (zone.Cost > mostExpensive.Cost) mostExpensive = zone });
  return (
    <Card>
      <Card.Header>
        Path to {props.path.Zones[props.path.Zones.length - 1].Name}
      </Card.Header>
      <Card.Body>
        <StatRow name="Cost" value={formatNumber(props.path.TotalCost)} />
        <StatRow name="Most expensive" value={formatNumber(mostExpensive.Cost)} />
        <Button onClick={() => conquerZones(props.path.Zones)}>Conquer</Button>
      </Card.Body>
    </Card>
  );
};
export default PathHighlight;
