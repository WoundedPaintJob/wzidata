import Card from "@components/atoms/card";
import MaterialDetails from "@features/material/components/details";
import { MineState } from "../lib/types";
import AssetHeader from "@components/assetHeader";
import StatRow from "@components/atoms/statrow";
import {
  canLevelUp,
  canLevelDown,
  getAssetUpgradeCost,
} from "@helpers/assetHelper";
import useLevelStore from "@lib/stores/levelStore";
import LevelControl from "@components/atoms/levelControl";
import { mineMultiplierAtLevel } from "../lib/helper";
import Text from "@components/atoms/text";
import CheckBox from "@components/atoms/checkbox";
import { formatNumber } from "@helpers/numberHelper";

const Mine = (props: {
	mine: MineState;
	productionMultiplier: number;
	costMultiplier: number;
}) => {
  const levelup = useLevelStore((state) => state.LevelUp);
  const leveldown = useLevelStore((state) => state.LevelDown);
  const revision = useLevelStore((state) => state.LevelRevision);
  const toggleSuperCharge = useLevelStore((state) => state.SuperChargeMine);
  return (
    <Card>
      <Card.Header>
        <AssetHeader asset={props.mine} />
      </Card.Header>
      <Card.Body>
        <div className="flex space-x-2">
          <div>
            <StatRow
              name="Level"
              value={`${props.mine.Level}/${
                props.mine.UpgradeCosts.length + 1
              }`}
            />
            <MaterialDetails
              materials={props.mine.Materials}
              roundNumber={"precision"}
              multiplier={
                mineMultiplierAtLevel(props.mine.Level, revision) *
								props.productionMultiplier *
								(props.mine.SuperCharged ? 20 : 1)
              }
            />
            <div className="flex">
              <Text size="small">SC: </Text>
              <CheckBox
                checked={props.mine.SuperCharged || false}
                onClick={() => toggleSuperCharge(props.mine)}
              />
            </div>
            <LevelControl
              CanLevelUp={canLevelUp(props.mine)}
              LevelUp={() => levelup(props.mine)}
              CanLevelDown={canLevelDown(props.mine)}
              LevelDown={() => leveldown(props.mine)}
            />
          </div>
          <div>
            {canLevelUp(props.mine) && (
              <>
                <StatRow name="Upgrade" />
                <MaterialDetails
                  materials={props.mine.Materials}
                  roundNumber={"precision"}
                  multiplier={
                    mineMultiplierAtLevel(props.mine.Level + 1, revision) *
										props.productionMultiplier *
										(props.mine.SuperCharged ? 20 : 1)
                  }
                />
                <StatRow
                  name="Cost"
                  value={formatNumber(
                    getAssetUpgradeCost(props.mine) * props.costMultiplier
                  )}
                />
              </>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
export default Mine;
