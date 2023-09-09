import Text from '@components/atoms/text';
import MaterialDetails from '@features/material/components/details';
import { MarketState } from '../lib/types';

const MarketDetails = (props: { market: MarketState }) => {
  return (
    <>
      <Text size="body">Market</Text>
      <div className="flex">
        <MaterialDetails materials={props.market.Materials} />
      </div>
    </>
  );
};
export default MarketDetails;
