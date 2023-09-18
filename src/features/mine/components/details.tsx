import MaterialDetails from "@features/material/components/details";
import { MineState } from "../lib/types";
import { Settings } from "src/settings";
import Text from "@components/atoms/text";
import { getMultiplier } from "@lib/services/multiplierService";
import { MultiplierType } from "@lib/services/multiplierService/types";
import useLevelStore from "@lib/stores/levelStore";
import usePlayerStore from "@lib/stores/playerStore";
import { mineMultiplierAtLevel } from "../lib/helper";
const MineDetails = (props: { mine: MineState | undefined }) => {
  const advancements = usePlayerStore((state) => state.Advancements);
  const artifacts = usePlayerStore((state) => state.Artifacts);
  const techs = useLevelStore((state) => state.Techs);
  const revision = useLevelStore((state) => state.LevelRevision) || 1;
  const productionMultiplier = getMultiplier(
    MultiplierType.MineProduction,
    advancements,
    artifacts,
    techs
  );
  if (!props.mine) return <></>;
  return (
    <>
      <div className="flex">
        <img src={`${Settings.RewardUrl}Mine.png`} className="w-6 h-6" />
        <Text size="small">{props.mine.Name}</Text>
      </div>
      <MaterialDetails materials={props.mine.Materials} multiplier={mineMultiplierAtLevel(1, revision)*productionMultiplier} roundNumber="precision" />
    </>
  );
};
export default MineDetails;
