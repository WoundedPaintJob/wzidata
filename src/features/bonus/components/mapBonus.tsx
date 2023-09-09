import useLevelStore from '@lib/stores/levelStore';
import { shouldDrawImage } from '@features/zone/lib/helper';
import { BonusState } from '../lib/types';
import { Settings } from 'src/settings';

const MapBonus = (props: { bonus: BonusState }) => {
  const renderSettings = useLevelStore((state) => state.RenderOptions);
  const setActive = useLevelStore((state) => state.SetActiveBonus);
  const assetSize = 40;
  const drawImage = shouldDrawImage(props.bonus.Reward, renderSettings);
  if (drawImage && !props.bonus.Conquered)
    return (
      <image
        key={`${props.bonus.Id}Ass`}
        href={`${Settings.RewardUrl}${props.bonus.Reward.Image}`}
        x={props.bonus.Svg.Center.X - assetSize / 2}
        y={props.bonus.Svg.Center.Y - assetSize / 2}
        width={assetSize}
        height={assetSize}
        onClick={() => setActive(props.bonus)}
      />
    );
};
export default MapBonus;
