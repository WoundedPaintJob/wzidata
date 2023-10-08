import useLevelStore from "@lib/stores/levelStore";
import { shouldDrawImage } from "@features/zone/lib/helper";
import { Settings } from "src/settings";
import { RenderOptionType } from "@lib/types/enums";
import { formatNumber } from "@helpers/numberHelper";
import useBonus from "@lib/state/hooks/useBonus";

const MapBonus = (props: { bonusId: number }) => {
  const bonus = useBonus(props.bonusId);
  const renderSettings = useLevelStore((state) => state.RenderOptions);
  const setActive = useLevelStore((state) => state.SetActiveBonus);
  const assetSize = 40;
  if (!bonus) return <></>;
  const drawImage = shouldDrawImage(bonus.Reward, renderSettings, bonus.Conquered);
  if (!bonus.Svg) return <></>;
  return (
    <g key={`Z${bonus.Id}G`} onClick={() => setActive(bonus)}>
      {bonus.Svg.Shapes.map((sh, index) => (
        <polygon
          key={`B${bonus.Id}${index}Pol`}
          id={`B${bonus.Id}`}
          points={sh.Path}
          stroke="#000"
          fill="#000"
        />
      ))}
      {drawImage && (
        <image
          key={`${bonus.Id}Ass`}
          href={`${Settings.RewardUrl}${bonus.Reward.Image || ""}`}
          x={bonus.Svg.Center.X - assetSize / 2}
          y={bonus.Svg.Center.Y - assetSize / 2}
          width={assetSize}
          height={assetSize}
          onClick={() => setActive(bonus)}
        />
      )}
      {renderSettings.get(RenderOptionType.MoneyPerSecond) &&
        bonus.Reward.MoneyPerSecond && (
        <text
          key={`${bonus.Id}Text`}
          x={bonus.Svg.Center.X - 8}
          y={bonus.Svg.Center.Y + 2}
          fill="#FFF"
          fontWeight={400}
          fontSize={10}
        >
          {formatNumber(bonus.Reward.MoneyPerSecond)}
        </text>
      )}
    </g>
  );
};
export default MapBonus;
