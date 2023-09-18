import Card from "@components/atoms/card";
import { ArmyCampState } from "../lib/types";
import AssetHeader from "@components/assetHeader";
import { armiesProducedAtLevel } from "../lib/helper";
import StatRow from "@components/atoms/statrow";
import { formatNumber } from "@helpers/numberHelper";
import LevelControl from "@components/atoms/levelControl";
import {
  canLevelUp,
  canLevelDown,
  getAssetUpgradeCost,
} from "@helpers/assetHelper";
import useLevelStore from "@lib/stores/levelStore";
import Text from "@components/atoms/text";
import CheckBox from "@components/atoms/checkbox";

const ArmyCamp = (props: {
  armyCamp: ArmyCampState;
  productionMultiplier: number;
  costMultiplier: number;
}) => {
  const levelup = useLevelStore((state) => state.LevelUp);
  const leveldown = useLevelStore((state) => state.LevelDown);
  const revision = useLevelStore((state) => state.LevelRevision) || 1;
  const toggleSuperCharge = useLevelStore((state) => state.SuperChargeArmyCamp);
  return (
    <Card>
      <Card.Body>
        <div className="grid grid-cols-2">
          <div className="col-span-full">
            <AssetHeader asset={props.armyCamp} />
          </div>
          <div className="col-span-1">
            <StatRow
              name="Level"
              value={`${props.armyCamp.Level}/${props.armyCamp.UpgradeCosts.length + 1}`}
            />
          </div>
          <div className="col-span-1">
            <StatRow
              name="A/S"
              value={formatNumber(
                armiesProducedAtLevel(props.armyCamp, revision) *
                props.productionMultiplier
              )}
            />
          </div>
          <div className="col-span-full flex">
            <Text size="small">SuperCharge: </Text>
            <CheckBox
              checked={props.armyCamp.SuperCharged || false}
              onClick={() => toggleSuperCharge(props.armyCamp)}
            />

          </div>
          <LevelControl
            CanLevelUp={canLevelUp(props.armyCamp)}
            LevelUp={() => levelup(props.armyCamp)}
            CanLevelDown={canLevelDown(props.armyCamp)}
            LevelDown={() => leveldown(props.armyCamp)}
          />
          {canLevelUp(props.armyCamp) && (
            <>
              <div className="col-span-full">
                <StatRow
                  name="Upgrade cost"
                  value={formatNumber(
                    getAssetUpgradeCost(props.armyCamp) * props.costMultiplier
                  )}
                />
              </div>
              <div className="col-span-1">
                <StatRow
                  name="A/S"
                  value={formatNumber(
                    armiesProducedAtLevel(
                      props.armyCamp,
                      revision,
                      props.armyCamp.Level + 1
                    ) * props.productionMultiplier
                  )}
                />
              </div>
              <div className="col-span-1">
                <StatRow
                  name="$/A"
                  value={formatNumber(
                    getAssetUpgradeCost(props.armyCamp) **
                    props.costMultiplier /
                    (armiesProducedAtLevel(
                      props.armyCamp,
                      revision,
                      props.armyCamp.Level + 1
                    ) *
                      props.productionMultiplier -
                      armiesProducedAtLevel(props.armyCamp, revision) *
                      props.productionMultiplier)
                  )}
                />
              </div>
            </>
          )}
        </div>
      </Card.Body>
    </Card >
  );
};
export default ArmyCamp;
