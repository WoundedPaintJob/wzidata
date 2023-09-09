import BonusHeader from '@features/bonus/components/header';
import ZoneHeader from '@features/zone/components/header';
import { AssetState } from '@lib/types/assets';

const AssetHeader = (props: { asset: AssetState }) => {
  return (
    <div>
      {props.asset.Zone && <ZoneHeader zoneId={props.asset.Zone} />}
      {props.asset.Bonus && <BonusHeader bonusId={props.asset.Bonus} />}
    </div>
  );
};

export default AssetHeader;
