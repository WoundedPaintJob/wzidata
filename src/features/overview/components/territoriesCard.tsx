import Card from "@components/atoms/card";
import StatRow from "@components/atoms/statrow";
import { formatNumber, formatPercentage } from "@helpers/numberHelper";
import { CardData } from "../lib/types";

const TerritoriesCard = (props: CardData) => {
  const unconqueredZones = props.zones.filter((z) => !z.Conquered);
  return (
    <Card>
      <Card.SmallHeader>Territories</Card.SmallHeader>
      <Card.Body>
        <StatRow name="Total" value={formatNumber(props.zones.length)} />
        <StatRow
          name="Remaining"
          value={formatNumber(unconqueredZones.length)}
          percentage={formatPercentage(
            unconqueredZones.length / props.zones.length
          )}
        />
      </Card.Body>
    </Card>
  );
};
export default TerritoriesCard;
