import Card from "@components/atoms/card";
import StatRow from "@components/atoms/statrow";
import { formatNumber, formatPercentage } from "@helpers/numberHelper";
import useLevelStore from "@lib/stores/levelStore";
import { CardData } from "../lib/types";
import useMostExpensive from "@lib/state/hooks/useMostExpensive";

const ArmyCard = (props: CardData) => {
  const unconqueredZones = props.zones.filter((z) => !z.Conquered);
  const setActiveZone = useLevelStore((state) => state.SetActiveZone);
  const totalArmies = props.zones.map((z) => z.Cost).reduce((a, b) => a + b);
  const remainingArmies = unconqueredZones
    .map((z) => z.Cost)
    .reduce((a, b) => a + b);
  const biggestCampZone = useMostExpensive();
  return (
    <Card>
      <Card.SmallHeader>Armies</Card.SmallHeader>
      <Card.Body>
        <StatRow name="Total" value={formatNumber(totalArmies)} />
        <StatRow
          name="Remaining"
          value={formatNumber(remainingArmies)}
          percentage={formatPercentage(remainingArmies / totalArmies)}
        />
        {biggestCampZone && (
          <StatRow
            name={biggestCampZone.Name}
            value={formatNumber(biggestCampZone.Cost)}
            onClick={() => setActiveZone(biggestCampZone)}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default ArmyCard;
