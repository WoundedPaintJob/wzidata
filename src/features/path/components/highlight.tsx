import Card from "@components/atoms/card";
import StatRow from "@components/atoms/statrow";
import { formatNumber } from "@helpers/numberHelper";
import useLevelStore from "@lib/stores/levelStore";
import { MapPath } from "../lib/types";
import Button from "@components/atoms/button";

const PathHighlight = (props: { path: MapPath }) => {
  const conquerZones = useLevelStore((state) => state.ConquerZones);
  return (
    <Card>
      <Card.Header>
				Path to {props.path.Zones[props.path.Zones.length - 1].Name}
      </Card.Header>
      <Card.Body>
        <StatRow name="Cost" value={formatNumber(props.path.TotalCost)} />
        <Button onClick={() => conquerZones(props.path.Zones)}>
					Conquer
        </Button>
      </Card.Body>
    </Card>
  );
};
export default PathHighlight;
