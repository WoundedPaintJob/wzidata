import Card from '@components/atoms/card';
import StatRow from '@components/atoms/statrow';
import { formatNumber } from '@helpers/numberHelper';
import { ZoneState } from '../lib/types';

const Zone = (props: { zone: ZoneState }) => {
  if (!props.zone) return <>No Zone</>;
  return (
    <Card>
      <Card.Header>{props.zone.Name}</Card.Header>
      <Card.Body>
        <StatRow name="Cost" value={formatNumber(props.zone.Cost)} />
      </Card.Body>
    </Card>
  );
};
export default Zone;
