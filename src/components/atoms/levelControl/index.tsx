import Text from '../text';
import { LevelControlProps } from './types';
const LevelControl = (props: LevelControlProps) => {
  return (
    <>
      <div>
        {props.CanLevelUp ? (
          <Text mode="link" onClick={props.LevelUp} size='small'>
            Lvl Up
          </Text>
        ) : (
          <Text mode="inactive" size='small'>LvlUp</Text>
        )}
      </div>
      <div>
        {props.CanLevelDown ? (
          <Text mode="link" onClick={props.LevelDown} size='small'>
            Lvl Down
          </Text>
        ) : (
          <Text mode="inactive" size='small'>Lvl Down</Text>
        )}
      </div>
    </>
  );
};
export default LevelControl;
