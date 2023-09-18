import useLevelStore from '@lib/stores/levelStore';
import BonusLink from './link';
import CheckBox from '@components/atoms/checkbox';

const BonusHeader = (props: { bonusId: number }) => {
  const bonus = useLevelStore((state) => state.Bonuses.get(props.bonusId));
  if (bonus == undefined)
    return <></>
  const toggleConquered = useLevelStore((state) => state.ConquerBonus);
  return (
    <>
      <BonusLink bonus={bonus} />
      <CheckBox
        checked={bonus.Conquered || false}
        onClick={() => toggleConquered(bonus)}
      />
    </>
  );
};
export default BonusHeader;
