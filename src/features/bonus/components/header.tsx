import useLevelStore from '@lib/stores/levelStore';
import BonusLink from './link';
import CheckBox from '@components/atoms/checkbox';

const BonusHeader = (props: { bonusId: number }) => {
  const bonus = useLevelStore((state) => state.Bonuses.get(props.bonusId));
  const toggleConquered = useLevelStore((state) => state.ConquerBonus);
  return (
    <div className="flex">
      <BonusLink bonus={bonus} />
      <CheckBox
        checked={bonus.Conquered}
        onClick={() => toggleConquered(bonus)}
      />
    </div>
  );
};
export default BonusHeader;
