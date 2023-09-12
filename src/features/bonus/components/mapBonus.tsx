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
  if (
    renderSettings.get(RenderOptionType.MoneyPerSecond) &&
    props.bonus.Reward.MoneyPerSecond
  ) {
    return (
      <text
        key={`${props.bonus.Id}Text`}
        x={props.bonus.Svg.Center.X - 8}
        y={props.bonus.Svg.Center.Y + 2}
        fontWeight={400}
        fontSize={10}
        onClick={() => setActive(props.bonus)}
      >
        {formatNumber(props.bonus.Reward.MoneyPerSecond)}
      </text>
    );
  }
};
export default MapBonus;
