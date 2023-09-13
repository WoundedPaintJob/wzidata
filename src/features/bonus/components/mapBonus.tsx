import useLevelStore from "@lib/stores/levelStore";
import { shouldDrawImage } from "@features/zone/lib/helper";
import { BonusState } from "../lib/types";
import { Settings } from "src/settings";
import { RenderOptionType } from "@lib/types/enums";
import { formatNumber } from "@helpers/numberHelper";

const MapBonus = (props: { bonus: BonusState }) => {
  const renderSettings = useLevelStore((state) => state.RenderOptions);
  const setActive = useLevelStore((state) => state.SetActiveBonus);
  const assetSize = 40;
  const drawImage = shouldDrawImage(props.bonus.Reward, renderSettings);
  if (!props.bonus.Svg) return <></>
  return (
    <g key={`Z${props.bonus.Id}G`} onClick={() => setActive(props.bonus)}>
      {props.bonus.Svg.Shapes.map((sh, index) => (
        <polygon
          key={`B${props.bonus.Id}${index}Pol`}
          id={`B${props.bonus.Id}`}
          points={sh.Path}
          stroke="#000"
          fill="#000"
        />
      ))}
      {drawImage && !props.bonus.Conquered && (
        <image
          key={`${props.bonus.Id}Ass`}
          href={`${Settings.RewardUrl}${props.bonus.Reward.Image||''}`}
          x={props.bonus.Svg.Center.X - assetSize / 2}
          y={props.bonus.Svg.Center.Y - assetSize / 2}
          width={assetSize}
          height={assetSize}
          onClick={() => setActive(props.bonus)}
        />
      )}
      {renderSettings.get(RenderOptionType.MoneyPerSecond) &&
        props.bonus.Reward.MoneyPerSecond && (
        <text
          key={`${props.bonus.Id}Text`}
          x={props.bonus.Svg.Center.X - 8}
          y={props.bonus.Svg.Center.Y + 2}
          fill="#FFF"
          fontWeight={400}
          fontSize={10}
        >
          {formatNumber(props.bonus.Reward.MoneyPerSecond)}
        </text>
      )}
    </g>
  );
};
export default MapBonus;
