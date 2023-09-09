import Card from '@components/atoms/card';
import { MercenaryCampState } from '../lib/types';
import AssetHeader from '@components/assetHeader';
import StatRow from '@components/atoms/statrow';
import { formatNumber } from '@helpers/numberHelper';
import useLevelStore from '@lib/stores/levelStore';
import usePlayerStore from '@lib/stores/playerStore';
import { MultiplierType } from '@lib/services/multiplierService/types';
import { getMultiplier } from '@lib/services/multiplierService';

const MercenaryCamp = (props: { mercCamp: MercenaryCampState }) => {
  
  const advancements = usePlayerStore((state) => state.Advancements);
  const artifacts = usePlayerStore((state) => state.Artifacts);
  const techs = useLevelStore((state) => state.Techs);
  const mercMultiplier = getMultiplier(
    MultiplierType.MercenaryProduction,
    advancements,
    artifacts,
    techs
  );
  const mercDiscountMultiplier = getMultiplier(
    MultiplierType.MercenaryDiscount,
    advancements,
    artifacts,
    techs
  );
  return (
    <Card>
      <Card.Header>
        <AssetHeader asset={props.mercCamp} />
      </Card.Header>
      <Card.Body>
        <StatRow
          name="Armies"
          value={formatNumber(props.mercCamp.ArmiesLeft * mercMultiplier)}
        />
        <StatRow
          name="Cost"
          value={formatNumber(
            props.mercCamp.CostPerArmy * mercDiscountMultiplier
          )}
        />
        <StatRow
          name="Total Cost"
          value={formatNumber(
            props.mercCamp.ArmiesLeft *
              mercMultiplier *
              props.mercCamp.CostPerArmy *
              mercDiscountMultiplier
          )}
        />
      </Card.Body>
    </Card>
  );
};
export default MercenaryCamp;
