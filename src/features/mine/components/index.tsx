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
  const revision = useLevelStore((state) => state.LevelRevision) || 1;
  const toggleSuperCharge = useLevelStore((state) => state.SuperChargeMine);
  return (
    <Card>
      <Card.Body>
        <div className="grid grid-cols-2">
          <div className="col-span-full">
            <AssetHeader asset={props.mine} />
          </div>
          <div className="col-span-1">
            <StatRow
              name="Level"
              value={`${props.mine.Level}/${
                props.mine.UpgradeCosts.length + 1
              }`}
            />
          </div>
          <div className="col-span-full flex">
            <Text size="small">SuperCharge: </Text>
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
          {canLevelUp(props.mine) && (
            <>
              <div className="col-span-full">
                <StatRow
                  name="Upgrade cost"
                  value={formatNumber(
                    getAssetUpgradeCost(props.mine) * props.costMultiplier
                  )}
                />
              </div>

              <div className="col-span-1">
                <Text size="small">Current:</Text>
                <MaterialDetails
                  materials={props.mine.Materials}
                  roundNumber={"precision"}
                  multiplier={
                    mineMultiplierAtLevel(props.mine.Level, revision) *
                    props.productionMultiplier *
                    (props.mine.SuperCharged ? 20 : 1)
                  }
                />
              </div>
              <div className="col-span-1">
                <Text size="small">Next:</Text>
                <MaterialDetails
                  materials={props.mine.Materials}
                  roundNumber={"precision"}
                  multiplier={
                    mineMultiplierAtLevel(props.mine.Level + 1, revision) *
                    props.productionMultiplier *
                    (props.mine.SuperCharged ? 20 : 1)
                  }
                />
              </div>
            </>
          )}
          {!canLevelUp(props.mine) && (
            <div className="col-span-1">
              <Text size="small">Current:</Text>
              <MaterialDetails
                materials={props.mine.Materials}
                roundNumber={"precision"}
                multiplier={
                  mineMultiplierAtLevel(props.mine.Level, revision) *
                  props.productionMultiplier *
                  (props.mine.SuperCharged ? 20 : 1)
                }
              />
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
export default Mine;
