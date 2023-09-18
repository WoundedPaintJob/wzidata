import Card from '@components/atoms/card';
import LevelControl from '@components/atoms/levelControl';
import StatRow from '@components/atoms/statrow';
import {
  canLevelDown,
  canLevelUp,
  getAssetUpgradeCost,
} from '@helpers/assetHelper';
import { formatNumber } from '@helpers/numberHelper';
import useLevelStore from '@lib/stores/levelStore';
import { hospitalsSavedAtLevel } from '../lib/helper';
import { HospitalState } from '../lib/types';
import AssetHeader from '@components/assetHeader';

const Hospital = (props: { hospital: HospitalState; multiplier: number }) => {
  const levelup = useLevelStore((state) => state.LevelUp);
  const leveldown = useLevelStore((state) => state.LevelDown);
  return (
    <Card>
      <Card.Body>
        <div className="grid grid-cols-2">
          <div className="col-span-full">
            <AssetHeader asset={props.hospital} />
          </div>
          <div className="col-span-1">
            <StatRow
              name="Level"
              value={`${props.hospital.Level}/${props.hospital.UpgradeCosts.length + 1}`}
            />
          </div>
          <div className="col-span-1">
            <StatRow
              name="Saves"
              value={formatNumber(
                hospitalsSavedAtLevel(props.hospital) * props.multiplier
              )}
            />
          </div>
          <LevelControl
            CanLevelUp={canLevelUp(props.hospital)}
            LevelUp={() => levelup(props.hospital)}
            CanLevelDown={canLevelDown(props.hospital)}
            LevelDown={() => leveldown(props.hospital)}
          />
          {canLevelUp(props.hospital) && (
            <>
              <div className="col-span-full">
                <StatRow
                  name="Upgrade cost"
                  value={formatNumber(getAssetUpgradeCost(props.hospital))}
                />
              </div>
              <div className="col-span-1">
                <StatRow
                  name="Saves"
                  value={formatNumber(
                    hospitalsSavedAtLevel(
                      props.hospital,
                      props.hospital.Level + 1
                    ) * props.multiplier
                  )}
                />
              </div>
              <div className="col-span-1">
                <StatRow
                  name="$/A"
                  value={formatNumber(
                    getAssetUpgradeCost(props.hospital) /
                    (hospitalsSavedAtLevel(
                      props.hospital,
                      props.hospital.Level + 1
                    ) *
                      props.multiplier -
                      hospitalsSavedAtLevel(props.hospital) *
                      props.multiplier)
                  )}
                />
              </div>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
export default Hospital;
