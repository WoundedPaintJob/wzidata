import { Settings } from "src/settings";
import { MercenaryCampState } from "../lib/types";
import StatRow from "@components/atoms/statrow";
import { formatNumber } from "@helpers/numberHelper";
import { getMultiplier } from "@lib/services/multiplierService";
import { MultiplierType } from "@lib/services/multiplierService/types";
import useLevelStore from "@lib/stores/levelStore";
import usePlayerStore from "@lib/stores/playerStore";

const MercenaryCampDetails = (props: {
  mercenaryCamp: MercenaryCampState | undefined;
}) => {
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
  if (!props.mercenaryCamp) return <></>;
  return (
    <div className="flex">
      <img src={`${Settings.RewardUrl}MercenaryCamp.png`} className="w-6 h-6" />
      <StatRow
        name="Mercs"
        value={formatNumber(props.mercenaryCamp.ArmiesLeft * mercMultiplier)}
        percentage={`${formatNumber(
          props.mercenaryCamp.CostPerArmy * mercDiscountMultiplier
        )}`}
      />
    </div>
  );
};
export default MercenaryCampDetails;
