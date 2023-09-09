import Card from '@components/atoms/card';
import StatRow from '@components/atoms/statrow';
import { formatNumber, formatPercentage } from '@helpers/numberHelper';
import { CardData } from '../lib/types';

const TerritoriesCard = (props: { data: CardData }) => {
  return (
    <Card>
      <Card.SmallHeader>Territories</Card.SmallHeader>
      <Card.Body>
        <StatRow name="Total" value={formatNumber(props.data.zones.length)} />
        <StatRow
          name="Remaining"
          value={formatNumber(props.data.unconqueredZones.length)}
          percentage={formatPercentage(
            props.data.unconqueredZones.length / props.data.zones.length
          )}
        />
      </Card.Body>
    </Card>
  );
};
export default TerritoriesCard;
