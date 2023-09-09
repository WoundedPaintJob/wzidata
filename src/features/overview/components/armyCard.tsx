import Card from '@components/atoms/card';
import StatRow from '@components/atoms/statrow';
import { formatNumber, formatPercentage } from '@helpers/numberHelper';
import useLevelStore from '@lib/stores/levelStore';
import { CardData } from '../lib/types';

const ArmyCard = (props: { data: CardData }) => {
  const setActiveZone = useLevelStore((state) => state.SetActiveZone);
  const totalArmies = props.data.zones
    .map((z) => z.Cost)
    .reduce((a, b) => a + b);
  const remainingArmies = props.data.unconqueredZones
    .map((z) => z.Cost)
    .reduce((a, b) => a + b);
  const biggestCampZone = props.data.unconqueredZones.reduce(function (
    prev,
    current
  ) {
    return prev.Cost > current.Cost ? prev : current;
  });
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
        <StatRow
          name={biggestCampZone.Name}
          value={formatNumber(biggestCampZone.Cost)}
          onClick={() => setActiveZone(biggestCampZone)}
        />
      </Card.Body>
    </Card>
  );
};

export default ArmyCard;
